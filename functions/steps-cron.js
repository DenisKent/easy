const faunadb = require('faunadb');
const dayjs = require("dayjs")
const {refreshAccessToken} = require("./utils/oAuth")

const got = require("got")
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})


const getStepsData = async (googleAccessToken) => {
  const days = 14;
  const startTimeMillis = dayjs().subtract(days - 1, "day").startOf('day').valueOf() + 1;
  const endTimeMillis = dayjs().valueOf();
  const bucketSize = 24*60*60*1000

  const response = await got(`https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`, {
    method: "POST",
    headers: { Authorization: `Bearer ${googleAccessToken}` },
    json: {
      aggregateBy: [{ dataSourceId: "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps" }],
      bucketByTime: { durationMillis: bucketSize },
      startTimeMillis,
      endTimeMillis
    },
    responseType: 'json'
  })
      
  const mappedBuckets = response.body.bucket.map((bucket) => {
    const {startTimeMillis, endTimeMillis} = bucket;
    console.log({startTimeMillis, endTimeMillis});
    const timeInMiddleOfPeriod = bucket.startTimeMillis + (bucket.endTimeMillis-startTimeMillis)/2

    return {
        date: dayjs(parseInt(startTimeMillis)).format("YYYY-MM-DD"),
        stepCount: bucket.dataset[0].point[0].value[0].intVal
    }
  })

  return mappedBuckets;
}

exports.handler = async () => {
  try {
    console.log("running steps cron")
    const users = await client.query(q.Map(
      q.Paginate(q.Documents(q.Collection('users'))),
      q.Lambda(x => q.Get(x))
    ));
    console.log("got users, count", users.data.length);
    
    const usersWithRefreshTokens = users.data.filter(user => user.data.google_refresh_token);
    console.log("removed users without refreshTokens, count", usersWithRefreshTokens.length);

    const userBuckets = await Promise.all(usersWithRefreshTokens.map(async user => {
      try {
        console.log("getting freshAccessToken for user", { email: user.data.email, google_refresh_token: user.data.google_refresh_token});
        const { access_token: freshAccessToken } = await refreshAccessToken(user.data.google_refresh_token);
        console.log("got freshAccessToken for user", { freshAccessToken, google_id: user.data.google_id });

        const steps = await getStepsData(freshAccessToken);
        console.log("got steps for user", user.ref.id, steps);

        const updatedUser = await client.query(q.Update(q.Ref(q.Collection("users"), user.ref.id), { data: { steps }}));
        console.log("updated user with new steps data", updatedUser)

        return steps;

      } catch (err){
        console.error(err.message);
        return [];
      }
    }));

    console.log("got user buckets", userBuckets)
  
    return {
      statusCode: 200,
      body: JSON.stringify({ userBuckets })
    };

  } catch (err){

    console.log("error", err)
    return {
      statusCode: 400,
      body: JSON.stringify({})
    }
  }
}
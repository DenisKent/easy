const faunadb = require('faunadb');
const dayjs = require("dayjs")
const {refreshAccessToken} = require("./utils/oAuth")

const got = require("got")
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

const getStepsData = async (googleAccessToken) => {
  const days = 7;
    const startTimeMillis = dayjs().subtract(days - 1, "day").startOf('day').valueOf() + 1;
    const endTimeMillis = dayjs().valueOf();
    const bucketSize = 24*60*60*1000
    const response = await got("https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate", {
            method: "POST",
            headers: { Authorization: `Bearer ${googleAccessToken}` },
            json: {
                aggregateBy: [
                    { dataSourceId: "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps" },
                    { dataSourceId: "derived:com.google.distance.delta:com.google.android.gms:from_steps<-merge_step_deltas" }],
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
                dayOfWeek: dayjs(parseInt(startTimeMillis)).format("dddd D MMM"),
                stepCount: bucket.dataset[0].point[0].value[0].intVal,
                // steps2: bucket.dataset[1].point[0].value[0].fpVal
            }
        })

        return mappedBuckets;
}

exports.handler = async (event, _context) => {
  try {
    const users = await client.query(q.Map(
      q.Paginate(q.Documents(q.Collection('users'))),
      q.Lambda(x => q.Get(x))
    ));
  
    const userBuckets = await Promise.all(users.data.map(async user => {
      const {access_token: freshAccessToken, expires_in} = await refreshAccessToken(user.data.google_refresh_token);
      console.log({freshAccessToken})
      const steps = await getStepsData(freshAccessToken);
      const updatedUser = await client.query(q.Update(q.Ref(q.Collection("users"), user.ref.id),
      { data: { steps }}
      ));
      return steps;
    }));
  
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
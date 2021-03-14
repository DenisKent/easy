const faunadb = require('faunadb');

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = async (event, context) => {
  try {

  const data = JSON.parse(event.body)
  
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
  

  return {
    statusCode: 200,
    body: JSON.stringify({ mappedBuckets })
  };

} catch (err){

  console.log("error", err)
  return {
    statusCode: 400,
    body: JSON.stringify(err)
  }
}
}
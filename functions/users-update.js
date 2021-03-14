const faunadb = require('faunadb');

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = async (event, context) => {
  try {

  const data = JSON.parse(event.body)
  console.log("Function `users-update` invoked", data)
  
  const updatedUser = await  client.query(q.Update(q.Ref(q.Collection("users"), data.id),
  { data: { google_code: data.google_code }}
  ));

  console.log({updatedUser})
    return {
      statusCode: 200,
      body: JSON.stringify({})
    };

} catch (err){

  console.log("error", err)
  return {
    statusCode: 400,
    body: JSON.stringify(err)
  }
}
}
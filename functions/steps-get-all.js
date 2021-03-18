const faunadb = require('faunadb');

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = async (event, context) => {
  try {
    console.log("Function `steps-get-all` invoked");
    const {data:allUsers} = await client.query(q.Map(
      q.Paginate(q.Documents(q.Collection("users")), { size: 50 }),
      q.Lambda(x => q.Get(x))
    ));
    const usersWithSteps = allUsers.filter(user => user.data.steps && user.data.steps.length);

    const strippedUsers = usersWithSteps.map(user => ({name: user.data.name, steps: user.data.steps }))
    return {
      statusCode: 200,
      body: JSON.stringify(strippedUsers)
    }

  } catch (err){
    console.error("error", err)
    return {
      statusCode: 400,
      body: JSON.stringify({})
    }
  }
}
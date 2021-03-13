const faunadb = require('faunadb');

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = async (event, context) => {
  try {

  const data = JSON.parse(event.body)
  console.log("Function `users-create` invoked", data)
  
  const doesUserExist = await client.query(q.Exists(q.Match(q.Index("users_search_by_google_id"), data.google_id)))
  
  console.log({doesUserExist})
  if(!doesUserExist){
    const newUser = await client.query(q.Create("users", {data}));
    console.log(newUser);
    return {
      statusCode: 200,
      body: JSON.stringify({
        name: newUser.data.name,
        google_id: newUser.data.google_id,
        id: newUser.ref.id
      })
    };

  } else {
    const existingUser = await client.query(q.Get(q.Match(q.Index("users_search_by_google_id"), data.google_id)))
    console.log({existingUser})
    return {
      statusCode: 200,
      body: JSON.stringify({
        name: existingUser.data.name,
        google_id: existingUser.data.google_id,
        id: existingUser.ref.id
      })
  
    };
  }
} catch (err){

  console.log("error", err)
  return {
    statusCode: 400,
    body: JSON.stringify(err)
  }
}
}
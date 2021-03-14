const faunadb = require('faunadb');
const {getAccessAndRefreshToken} = require("./utils/oAuth")

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = async (event, context) => {
  try {

  const data = JSON.parse(event.body)
  console.log("Function `users-update` invoked", data)

  const tokens = await getAccessAndRefreshToken(data.google_code)
    console.log({tokens})
  
  const updatedData = { 
    google_auth_code: data.google_code, 
    google_access_token: tokens.access_token, 
    google_access_token_expiry: tokens.expiry_date
  };
  if(tokens.refresh_token){
    updatedData.google_refresh_token = tokens.refresh_token
  }
  const updatedUser = await  client.query(q.Update(q.Ref(q.Collection("users"), data.id),
  { data: updatedData }
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
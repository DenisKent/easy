const faunadb = require('faunadb');

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

const collectionNames = ["todos", "users"];

exports.handler = async (event, context) => {
  try{
    const collectionsExist = await Promise.all(collectionNames.map((collectionName) => client.query(q.Exists(q.Collection(collectionName)))))
    const collectionObjects = collectionNames.map((collectionName, i) => ({ exists: collectionsExist[i], name: collectionName}))

    const collectionsToBeCreated = collectionObjects.filter(({exists}) => !exists);
    await Promise.all(collectionsToBeCreated.map(({name}) => client.query(q.CreateCollection({ name }))))

    console.log({collectionObjects, collectionsToBeCreated});
    return {
      statusCode: 200,
      body: JSON.stringify({collectionObjects, collectionsToBeCreated})
    }
  } catch (err){
    return {
      statusCode: 500,
      body: JSON.stringify(error)
    }
  }
};
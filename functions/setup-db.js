const faunadb = require('faunadb');

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

const collectionNames = ["users"];

const indexes = [{name: "users_search_by_google_id", source: q.Collection('users'), terms: [{ field: ["data", "google_id"] }], unique: true}];

exports.handler = async (event, context) => {
  try{
    const collectionsExist = await Promise.all(collectionNames.map((collectionName) => client.query(q.Exists(q.Collection(collectionName)))))
    const collectionObjects = collectionNames.map((collectionName, i) => ({ exists: collectionsExist[i], name: collectionName}))
    const collectionsToBeCreated = collectionObjects.filter(({exists}) => !exists);

    console.log({collectionsExist, collectionObjects, collectionsToBeCreated})

    await Promise.all(collectionsToBeCreated.map(({name}) => client.query(q.CreateCollection({ name }))))

    const indexesExist = await Promise.all(indexes.map(index => client.query(q.Exists(q.Index(index.name)))));
    const indexObjects = indexes.map((indexConfig, i) => ({ exists: indexesExist[i], indexConfig}))
    const indexesToBeCreated = indexObjects.filter(({exists}) => !exists);

    console.log({indexesExist, indexObjects, indexesToBeCreated})
    await Promise.all(indexesToBeCreated.map(({indexConfig}) => client.query(q.CreateIndex(indexConfig))));

    return {
      statusCode: 200,
      body: JSON.stringify({collectionsExist, collectionObjects, collectionsToBeCreated, indexesExist, indexObjects, indexesToBeCreated})
    }
  } catch (err){
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify(err)
    }
  }
};
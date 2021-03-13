const faunadb = require('faunadb');

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})


const createClasses = async () => {
    try{
        const db = await client.query(q.Create(q.Ref("classes"), { name: "todos" }))
        return true
    } catch (err){
        if(err.message === "instance already exists"){
            return true
        }
        console.error(err);
        return false
    }
}

const createindexes = async () => {
    try {
        const index = client.query(q.Create(q.Ref("indexes"), {name: "all_todos", source: q.Ref("classes/todos")}))
        return true
    } catch (err){
        if(err.message === "instance already exists"){
            return true
        }
        console.error(err);
        return false
    }
}

exports.handler = async function(event, context) {
    const classesCreated = await createClasses();
    const indexesCreated = await createindexes();
        return {
            statusCode: 200,
            body: JSON.stringify({classesCreated, indexesCreated})
        };
    }
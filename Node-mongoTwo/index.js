const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operation')

const url = 'mongodb://localhost:27017';
const dbname = 'conFusion';

MongoClient.connect(url)
    .then ((client)=> {

        console.log('Connected Correctly to the Server')

        const db = client.db(dbname);
        dboper.insertDocument(db, { name: 'bikul',description:'thapa'}, 'dishes')
    .then((result)=> {
        console.log('Insert Document: ', result.ops);

        return dboper.findDocuments(db,'dishes')
    })
    .then ((docs)=> {
            console.log("Found documents: ",docs)

            return dboper.updateDocument(db,{name: "bikul"},{description:'Updated thapa'}, 'dishes')
     })
    .then ((result)=> {
            console.log('UPdated Documents', result.result);
                
            return dboper.findDocuments(db,'dishes')
    })
    .then ((docs)=> {
            console.log("Found documents: ",docs)
            return db.dropCollection('dishes')
    })
    .then ((result)=> {
            console.log('Dropped Collection',result)

            client.close();
    })
    .catch((err)=> console.log(err));

})
.catch((err)=> console.log(err));
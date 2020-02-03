const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operation')

const url = 'mongodb://localhost:27017';
const dbname = 'conFusion';

MongoClient.connect(url,(err,client)=> {
    assert.equal(err,null);

    console.log('Connected Correctly to the Server')

    const db = client.db(dbname);
    dboper.insertDocument(db, { name: 'bikul',description:'thapa'}, 'dishes',(result)=> {
        console.log('Insert Document: ', result.ops);

        dboper.findDocuments(db,'dishes', (docs)=> {
            console.log("Found documents: ",docs)

            dboper.updateDocument(db,{name: "bikul"},{description:'Updated thapa'}, 'dishes', (result)=> {
                console.log('UPdated Documents', result.result);
                
                dboper.findDocuments(db,'dishes', (docs)=> {
                    console.log("Found documents: ",docs)
                    db.dropCollection('dishes',(result)=> {
                        console.log('Dropped Collection',result)

                        client.close();
                    });

                });

            });
        });
    });
});
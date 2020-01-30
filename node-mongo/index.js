const MongoClient = require('mongodb').MongoClient;
const assert = require('assert')
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';
MongoClient.connect(url,(err,client)=> {
    assert.equal(err,null);

    console.log('Connected correctly to the server')

    const db = client.db(dbname)

    // const collection = db.collection('dishes')

    // collection.insertOne({"name": "Uthappizza", "description": "Test"},(err,result)=> {
    //     assert.equal(err,null)

    //     console.log('After Insert:')
    //     console.log(result.ops);

    //     collection.find({}).toArray((err,docs)=> {
    //         assert.equal(err,null);

    //         console.log('Found:');
    //         console.log(docs);

    //         db.dropCollection('dishes',(err,result)=> {
    //             assert.equal(err,null);

    //             client.close();
    //         });
    //     });
    // });
    dboper.insertDocument(db, { name: "Vadonut", description: "Test"},
        "dishes", (result) => {
            console.log("Insert Document:\n", result.ops);

            dboper.findDocuments(db, "dishes", (docs) => {
                console.log("Found Documents:\n", docs);

                dboper.updateDocument(db, { name: "Vadonut" },
                    { description: "Updated Test" }, "dishes",
                    (result) => {
                        console.log("Updated Document:\n", result.result);

                        dboper.findDocuments(db, "dishes", (docs) => {
                            console.log("Found Updated Documents:\n", docs);
                            
                            db.dropCollection("dishes", (result) => {
                                console.log("Dropped Collection: ", result);

                                client.close();
                            });
                        });
                    });
            });
    });

});
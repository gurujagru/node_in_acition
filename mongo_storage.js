let client = require('mongodb').MongoClient;
let ObjectID = require('mongodb').ObjectID;

let url = 'mongodb://localhost:27017/test';

client.connect(url, function (err, client) {
    if (err) throw err;
    const db = client.db('test');
    db.createCollection(
        'test_insert',
        { "capped": true, "size": 100000, "max": 5000},
        function (err, documents) {
            if (err) throw err;
        }
    );
    db.collection('test_insert').insertOne({title: "brek", body: "telo"}, function (err, documents) {
        if (err) throw err;
        db.collection('test_insert').find({title: 'brek'}).toArray(
            function (err, results) {
                if (err) throw err;
                console.log('gornji:\n');
                console.log(results);
            }
        );

        db.collection('test_insert').updateOne(
            {title: 'brek'},
            {$set: {title: 'smek'}},
            function (err) {
                if (err) throw err;
            }
        );
        db.collection('test_insert').find({_id : ObjectID('5dfcab1ba844356cbf11f186')}).toArray(
            function (err, results) {
                if (err) throw err;
                console.log('donji:\n');

                console.log(results);
            }
        );

    });
    //client.close();
});
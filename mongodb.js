const MongoClient = require('mongodb').MongoClient;

module.exports.MongoDbClient = {
    insertDocument: function(
        _name,
        _age,
        url,
        dbName,
        collectionName,
        callback
    ) {
        MongoClient.connect(url, function(err, client) {
            if (err) console.log(`Connection error! ${err}`);
            else {
                var dataBase = client.db(dbName);
                const collection = dataBase.collection(collectionName);
                //Inserting documents
                collection.insertMany([{ name: _name, age: _age }], function(
                    err,
                    result
                ) {
                    callback(result);
                });
                //Creating index, ideally you won't be creating this everytime!
                collection.createIndex({ Name: 1, Age: 1 });
            }
        });
    }
};

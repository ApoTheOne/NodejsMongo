var express = require('express');
var fs = require('fs');
const bodyParser = require('body-parser');

const mongo = require('./mongodb');
const config = require('./config');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const readStream = fs.createReadStream(__dirname + '/index.html');
    readStream.pipe(res);
});

app.post('/', function(req, res) {
    const param = req.body;
    console.log(param);
    mongo.MongoDbClient.insertDocument(
        param.name,
        param.age,
        config.mongo.url,
        config.mongo.dbName,
        config.mongo.user,
        function() {
            console.log(`${param.name} : ${param.age} inserted.`);
        }
    );
    console.log(`${param.name} : ${param.age}`);
});

app.listen(3000, '127.0.0.1');

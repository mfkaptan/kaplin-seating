var express = require('express');
var app = express();
var path = require('path');
const Datastore = require('nedb');
let db = new Datastore({ filename: 'db/guests.db', autoload: true });

// viewed at http://localhost:8000
app.use('/', express.static(__dirname + '/public'));
app.listen(8000, serve);

function serve() {
    db.find({}, function(err, docs) {
        console.log(docs)
    });


    console.log("Hello world");
}
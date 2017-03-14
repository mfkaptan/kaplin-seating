var express = require('express');
var app = express();
var path = require('path');
const Datastore = require('nedb');

var db = {};
db.guests = new Datastore({ filename: 'db/guests.db', autoload: true });
db.tables = new Datastore({ filename: 'db/tables.db', autoload: true });

// viewed at http://localhost:8000
app.use('/', express.static(__dirname + '/public'));
app.listen(8000);

app.get('/guests', function(req, res) {
  db.guests.find({}, function(err, docs) {
    res.send(docs);
  });
})

app.get('/tables', function(req, res) {
  db.tables.find({}, function(err, docs) {
    res.send(docs);
  });
})
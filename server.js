var path = require('path');
const bodyParser = require('body-parser')
var express = require('express');
var app = express();
const Datastore = require('nedb');

var db = {};
db.guests = new Datastore({ filename: 'db/guests.db', autoload: true });
db.tables = new Datastore({ filename: 'db/tables.db', autoload: true });

// viewed at http://localhost:8000
app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.listen(8000);

app.get('/guests', function(req, res) {
  db.guests.persistence.compactDatafile();
  db.guests.find({}, function(err, guests) {
    res.send(guests);
  });
})

app.get('/tables', function(req, res) {
  db.tables.persistence.compactDatafile();
  db.tables.find({}, function(err, tables) {
    res.send(tables);
  });
})

app.post('/tables/guests', function(req, res) {
  let tableNo = parseInt(req.body.table);

  req.body.guests.forEach(function(g) {
    // Remove guest from old table
    db.tables.update({ no: parseInt(g.table) }, { $pull: { guests: { id: g.id } } });
    // Update guest's table
    g.table = tableNo;
    db.guests.update({ _id: g.id }, { $set: { table: tableNo } });
  });
  // Update table with new guests
  db.tables.update({ no: tableNo }, { $addToSet: { guests: { $each: req.body.guests } } });

  res.send();
})
const path = require('path');
const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const Datastore = require('nedb');

const db = {
  guests: new Datastore({ filename: 'db/guests.db', autoload: true }),
  tables: new Datastore({ filename: 'db/tables.db', autoload: true }),
};

// viewed at http://localhost:8000
app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
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

app.post('/tables/:tableNo/guests', function(req, res) {
  let tableNo = parseInt(req.params.tableNo);
  let guests = req.body.guests;

  guests.forEach(function(g) {
    // Clean
    g.size = parseInt(g.size);
    g.table = parseInt(g.table);

    // Remove guest from old table
    db.tables.update({ no: g.table }, { $pull: { guests: { id: g.id } } });
    // Update guest's table
    g.table = tableNo;
    db.guests.update({ _id: g.id }, { $set: { table: tableNo } });
  });
  // Update table with new guests
  db.tables.update({ no: tableNo }, { $addToSet: { guests: { $each: guests } } });

  res.send();
})
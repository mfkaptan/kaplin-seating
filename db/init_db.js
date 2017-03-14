const Datastore = require('nedb');


var db = {};
db.guests = new Datastore({ filename: 'db/guests.db', autoload: true });
db.tables = new Datastore({ filename: 'db/tables.db', autoload: true });

const guests_data = require('./guests.json');
db.guests.insert(guests_data, function(err, newDocs) {
  console.log(newDocs.length + " guests loaded successfully.");
});

// const tables_data = require('./tables.json');
// db.tables.insert(tables_data, function(err, newDocs) {
//   console.log(newDocs.length + " tables loaded successfully.");
// });

let tables = [];
let n = 1;
let R = 160,
  offset = 100;

// Middle
let a1 = { x: 950, y: offset, type: 1, no: n++, size: 10, guests: [] };
let a2 = { x: 1150, y: offset, type: 1, no: n++, size: 10, guests: [] };
let l1 = { x: 950, y: R + 360, type: 2, no: n++, size: 10, guests: [] };
let l2 = { x: 1150, y: R + 360, type: 2, no: n++, size: 10, guests: [] };
tables.push(a1, a2, l1, l2);

// Left side
for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    let t = { x: i * R + offset, y: j * R + offset, type: 0, no: n++, size: 10, guests: [] };
    tables.push(t);
  }
}

// Right side
for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    let t = { x: i * R + 1350, y: j * R + offset, type: 0, no: n++, size: 10, guests: [] };
    tables.push(t);
  }
}

db.tables.insert(tables, function(err, newDocs) {
  console.log(newDocs.length + " tables loaded successfully.");
});
const Datastore = require('nedb');


var db = {};
db.guests = new Datastore({ filename: 'db/guests.db', autoload: true });
db.tables = new Datastore({ filename: 'db/tables.db', autoload: true });

const guests_data = require('./guests.json');
db.guests.insert(guests_data, function(err, newDocs) {
  console.log(newDocs.length + " guests loaded successfully.");
});

let tables = [];
let n = 1;
const R = 160,
  offset = 100;

const TableType = {
  CIRCLE: 0,
  D_L: 1,
  D_R: 2,
  LONG: 3
}

// Middle
let a1 = { x: 950, y: offset, type: TableType.D_L, no: n++, capacity: 6, guests: [] };
let a2 = { x: 1150, y: offset, type: TableType.D_R, no: n++, capacity: 6, guests: [] };
let l1 = { x: 950, y: R + 360, type: TableType.LONG, no: n++, capacity: 18, guests: [] };
let l2 = { x: 1150, y: R + 360, type: TableType.LONG, no: n++, capacity: 18, guests: [] };
tables.push(a1, a2, l1, l2);

n = 55;
// Left side
for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    n = n-2;
    let t = { x: i * R + offset, y: j * R + offset, type: TableType.CIRCLE, no: n, capacity: 10, guests: [] };
    tables.push(t);
  }
}

n = 4
// Right side
for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    n = n+2
    let t = { x: i * R + 1350, y: j * R + offset, type: TableType.CIRCLE, no: n, capacity: 10, guests: [] };
    tables.push(t);
  }
}

db.tables.insert(tables, function(err, newDocs) {
  console.log(newDocs.length + " tables loaded successfully.");
});

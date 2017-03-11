const Datastore = require('nedb');
const data = require('./guests.json');
const db = new Datastore({ filename: 'db/guests.db', autoload: true });

db.insert(data, function(err, newDocs) {
    console.log(newDocs.length + " guests loaded successfully.");
});
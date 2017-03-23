var tables = {};
var guests = {};
var selectedGuests = [];
var TABLE_IMG = {};

function preload() {
  getGuests();
  getTables();
  TABLE_IMG = {
    C: loadImage("../img/c-table.png"),
    D_L: loadImage("../img/d-table-left.png"),
    D_R: loadImage("../img/d-table-right.png"),
    L: loadImage("../img/l-table.png")
  }
}

function setup() {
  createCanvas(2100, 850).parent('venue-canvas');
  frameRate(10);
}

function draw() {
  background("#FAEBD7");

  // Find selected guests
  selectedGuests = [];
  // Get selected guests total size
  let total = 0;
  $(".list-group-item.active").each(function() {
    if (this.id in guests) {
      selectedGuests.push(guests[this.id]);
      total += guests[this.id].size;
    }
  });

  for (let t in tables) {
    let table = tables[t];
    table.isHidden = false;
    // If has space for total
    if (table.space() < total) {
      table.isHidden = true;
      continue;
    }

    if (table.mouseOver()) {
      table.highlight();
    }

    table.draw();
  }
}

function mousePressed() {
  let selected = [];
  $(".list-group-item.active").each(function() {
    selected.push(guests[this.id]);
  });

  // Is a table clicked?
  for (let t in tables) {
    let table = tables[t];
    if (table.isHidden)
      continue;

    table.isClicked = false;

    // If this table clicked
    if (table.mouseOver()) {
      table.isClicked = true;
      appendSidebar("#table-guests", table.guests);
      // selected guests?
      if (selected.length) {
        // Put guests to table
        assignGuests(table.no, selected);
      }
    }
  }
}

String.prototype.turkishToUpper = function(){
    var string = this;
    var letters = { "i": "İ", "ş": "Ş", "ğ": "Ğ", "ü": "Ü", "ö": "Ö", "ç": "Ç", "ı": "I" };
    string = string.replace(/(([iışğüçö]))+/g, function(letter){ return letters[letter]; })
    return string.toUpperCase();
}

function search() {
  // Declare variables
  var input, filter, ul, li;
  input =  $("#search-box").val();
  filter = input.turkishToUpper();

  console.log(filter);

  foundGuests = []

  // Loop through all list items, and hide those who don't match the search query
 if (input !== "") {
  for (let g in guests) {
    if (guests[g].name.turkishToUpper().indexOf(filter) > -1) {
      foundGuests.push(guests[g]);
    }
  }
 }

  appendSidebar("#searched-guests",foundGuests);
}

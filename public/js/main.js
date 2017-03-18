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

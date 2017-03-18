var tables = {};
var guests = {};
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
  for (let t in tables) {
    if (tables[t].mouseOver()) {
      table = tables[t];
      table.highlight();
    }

    tables[t].draw();
  }
}

function mousePressed() {
  // Get table
  let table;
  for (let t in tables) {
    tables[t].clicked = false;
    if (tables[t].mouseOver()) {
      table = tables[t];
      table.clicked = true;
    }
  }

  // Table?
  if (table) {
    let selected = [];
    // Get active elements
    $(".list-group-item.active").each(function() {
      selected.push(guests[this.id]);
    });
    appendSidebar("#table-guests", table.guests, true);
    // Active?
    if (selected.length) {
      // Put guests to table
      assignGuests(table.no, selected);
    }
  }
}

function assignGuests(table, selectedGuests) {
  $.post("/tables/guests", { table: table, guests: selectedGuests }, function() {
    getGuests();
    getTables();
  });
}
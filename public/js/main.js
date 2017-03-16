var tables = {};
var guests = {};
var canvas;
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
  canvas = createCanvas(2100, 850);
  canvas.parent('venue-canvas');
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

function getGuests() {
  guests = {};
  let sidebar = [];
  $.get("/guests", function(data) {
    data.forEach(function(guest) {
      let g = new Guest(guest);
      guests[g.id] = g;
      if (g.table == 0) {
        sidebar.push(g);
      }
    })

    appendSidebar("#guest-list", sidebar);
  });
}

function getTables() {
  tables = {};
  $.get("/tables", function(data) {
    data.forEach(function(table) {
      let t = new Table(table);
      tables[t.no] = t;
    });
  })
}

function assignGuests(table, selectedGuests) {
  $.post("/tables/guests", { table: table, guests: selectedGuests }, function() {
    getGuests();
    getTables();
    appendSidebar("#table-guests", tables[table].guests);
  });
}
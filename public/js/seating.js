var tables = {};
var guests = {};
var canvas;
var tableImage;

function preload() {
  getGuests();
  getTables();
  tableImage = loadImage("../img/table.png");
}

function setup() {
  canvas = createCanvas(2100, 850);
  canvas.parent('venue-canvas');
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
    if (tables[t].mouseOver()) {
      table = tables[t];
      break;
    }
  }

  // Table?
  if (table) {
    let selected = [];
    // Get active elements
    $(".list-group-item.active").each(function() {
      selected.push(guests[this.id]);
    });
    // Active?
    if (selected.length) {
      // Put guests to table
      assignGuests(table.no, selected);
    }
  }
}

function getGuests() {
  const LI = '<a id="ID" href="#" class="list-group-item">NAME</a>';
  const N = "NAME";
  const ID = "ID";

  $.get("/guests", function(data) {
    data.forEach(function(guest) {
      let g = new Guest(guest);
      guests[g.id] = g;
      if (g.table == 0) {
        $("#guest-list").append(LI.replace(N, g.name).replace(ID, g.id));
      }
    })
  });
}

function getTables() {
  $.get("/tables", function(data) {
    data.forEach(function(table) {
      let t = new Table(table);
      tables[t.no] = t;
    });
  })
}

function assignGuests(table, selectedGuests) {
  $.post("/tables/guests", { table: table, guests: selectedGuests }, function(data) {
    data.forEach(function(g) {
      $("#" + g.id).remove();
      guests[g.id].table = table;
    })
    tables[table].guests = data;
  });
}
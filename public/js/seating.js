var tables = [];
var canvas;

function preload() {
  getGuests();
  getTables();
}

function setup() {
  canvas = createCanvas(2100, 850);
  canvas.parent('venue-canvas');
}

function draw() {
  background("#FAEBD7");
  tables.forEach(function(table) {
    table.draw();
  });
}

function getTables() {
  $.get("/tables", function(data) {
    data.forEach(function(table) {
      var t = new Table(table);
      tables.push(t);
    });
  })
}

function getGuests() {
  const LI = '<li><a href="#">NAME</a></li>';
  const N = "NAME";

  $.get("/guests", function(data) {
    for (let i = 0; i < data.length; i++) {
      $("#guest-list").append(LI.replace(N, data[i].name))
    }
  });
}
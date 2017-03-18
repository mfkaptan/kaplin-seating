const TableType = {
  CIRCLE: 0,
  D_L: 1,
  D_R: 2,
  LONG: 3
}
const C_R = 120,
  D_R = 160,
  L_W = 160,
  L_H = 400,
  G_S = 16,
  D_S = 20;

const COLORS = [
  "GreenYellow ",
  "LightPink",
  "OrangeRed",
  "SeaGreen",
  "ForestGreen",
  "Teal",
  "IndianRed",
  "FireBrick",
  "MediumVioletRed",
  "Indigo",
  "DarkRed",
  "Margoon",
  "Brown",
  "Turquoise",
  "DarkSlateGray",
  "OrangeRed",
  "PaleGreen",
  "MidnightBlue"
]

var circle_table_coordinates = [
  [0, -49],
  [30, -41],
  [49, -15],
  [49, 15],
  [30, 41],
  [0, 49],
  [-30, 41],
  [-49, 15],
  [-49, -15],
  [-30, -41],
];

var d_table_coordinates = [
  [-10, -65],
  [-10, +65],
  [-50, +60],
  [-65, -20],
  [-65, 20],
  [-50, -60],
];

var long_table_coordinates = [
  [65, -5],
  [65, -45],
  [65, -85],
  [65, -125],
  [65, -165],
  [65, 35],
  [65, 75],
  [65, 115],
  [65, 155],
  [-65, -5],
  [-65, -45],
  [-65, -85],
  [-65, -125],
  [-65, -165],
  [-65, 35],
  [-65, 75],
  [-65, 115],
  [-65, 155],
  [-65, -60],
];

function Table(table) {
  this.x = table.x;
  this.y = table.y;
  this.type = table.type;
  this.no = table.no;
  this.capacity = table.capacity;
  this.guests = table.guests || [];
  this.w = 0;
  this.h = 0;
  this.isClicked = false;
  this.isHidden = false;

  switch (this.type) {
    case TableType.CIRCLE:
      this.w = C_R;
      this.h = C_R;
      break;

    case TableType.D_L:
    case TableType.D_R:
      this.w = D_R;
      this.h = D_R;
      break;
    case TableType.LONG:
      this.w = L_W;
      this.h = L_H;
      break;
  }

  this.space = function() {
    let current = 0;
    for (let i = 0; i < this.guests.length; i++) {
      current += this.guests[i].size;
    }
    return this.capacity - current;
  }

  this.draw = function() {
    imageMode(CENTER);
    rectMode(CENTER);
    noStroke();

    switch (this.type) {
      case TableType.CIRCLE:
        image(TABLE_IMG.C, this.x, this.y, this.w, this.h);
        break;
      case TableType.D_L:
        image(TABLE_IMG.D_L, this.x, this.y, this.w, this.h);
        break;
      case TableType.D_R:
        image(TABLE_IMG.D_R, this.x, this.y, this.w, this.h);
        break;
      case TableType.LONG:
        image(TABLE_IMG.L, this.x, this.y, this.w, this.h);
        break;
    }

    // Table no
    textSize(20);
    fill("purple");
    text(this.no, this.x - 10, this.y + 5);

    // Guests
    this.drawGuests();

    if (this.isClicked) {
      rectMode(CENTER);
      fill(50, 50, 50, 100);
      rect(this.x, this.y, this.w, this.h);
    }
  }

  this.drawGuests = function() {

    let seat_no = 0;
    for (let i = 0; i < this.guests.length; i++) {
      for (let j = 0; j < this.guests[i].size; j++) {
        fill(COLORS[i]);

        switch (this.type) {
          case TableType.CIRCLE:
            rect(this.x + circle_table_coordinates[seat_no][0], this.y + circle_table_coordinates[seat_no][1], G_S, G_S);
            break;
          case TableType.D_L:
            rect(this.x + d_table_coordinates[seat_no][0], this.y + d_table_coordinates[seat_no][1], D_S, D_S);
            break;
          case TableType.D_R:
            rect(this.x - d_table_coordinates[seat_no][0], this.y - d_table_coordinates[seat_no][1], D_S, D_S);
            break;
          case TableType.LONG:
            rect(this.x + long_table_coordinates[seat_no][0], this.y + long_table_coordinates[seat_no][1], D_S, D_S);
            break;
        }
        seat_no++;
      }
    textSize(12);
    }
  }

  this.mouseOver = function() {
    if (this.x - this.w / 2 < mouseX && this.x + this.w / 2 > mouseX &&
      this.y - this.h / 2 < mouseY && this.y + this.h / 2 > mouseY) {
      return true;
    }
    return false;
  }

  this.highlight = function() {
    rectMode(CENTER);
    fill(100, 100, 100, 100);
    rect(this.x, this.y, this.w, this.h);
  }
}

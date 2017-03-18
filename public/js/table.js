TableType = {
  CIRCLE: 0,
  D: 1,
  LONG: 2
}
var C_R = 120,
  D_R = 160,
  L_W = 160,
  L_H = 400,
  G_S = 16;


function Table(table) {
  this.x = table.x;
  this.y = table.y;
  this.type = table.type;
  this.no = table.no;
  this.capacity = table.capacity;
  this.guests = table.guests || [];
  this.w = 0;
  this.h = 0;
  this.clicked = false;

  switch (this.type) {
    case TableType.CIRCLE:
      this.w = C_R;
      this.h = C_R;
      break;
    case TableType.D:
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
      case TableType.D:
        if (this.no % 2)
          image(TABLE_IMG.D_L, this.x, this.y, this.w, this.h);
        else
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

    if (this.clicked) {
      rectMode(CENTER);
      fill(50, 50, 50, 100);
      rect(this.x, this.y, this.w, this.h);
    }
  }

  this.drawGuests = function() {
    for (let i = 0; i < this.guests.length; i++) {
      if (this.guests[i].gender == "m")
        fill("skyblue");
      else
        fill("pink");

      // 0
      rect(this.x - 30, this.y - 41, G_S, G_S);

      // 6
      rect(this.x - 30, this.y + 41, G_S, G_S);

      textSize(12);
      fill("white");
      text(this.guests[i].name, this.x - 50, this.y + 45);
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
TypeEnum = {
  CIRCLE: 0,
  ARC: 1,
  LONG: 2
}
var C_R = 100,
  L_W = 80,
  L_H = 400;

function Table(table) {
  this.x = table.x;
  this.y = table.y;
  this.type = table.type;
  this.no = table.no;
  this.size = table.size;
  this.w = 0;
  this.h = 0;
  this.guests = table.guests;

  switch (this.type) {
    case TypeEnum.CIRCLE:
      this.w = C_R;
      this.h = C_R;
      break;
    case TypeEnum.ARC:
      this.w = C_R;
      this.h = C_R;
      break;
    case TypeEnum.LONG:
      this.w = L_W;
      this.h = L_H;
      break;
  }

  this.draw = function() {
    fill("orange");
    noStroke();
    switch (this.type) {
      case TypeEnum.CIRCLE:
        ellipse(this.x, this.y, this.w, this.h);
        break;
      case TypeEnum.ARC:
        if (this.no % 2)
          arc(this.x + 10, this.y, this.w, this.h, PI * 4.5, PI * 1.5);
        else
          arc(this.x - 10, this.y, this.w, this.h, PI * 1.5, PI * 4.5);
        break;
      case TypeEnum.LONG:
        rectMode(CENTER);
        rect(this.x, this.y, this.w, this.h);
        break;
    }

    // Table no
    textSize(18);
    fill("#4B0082");
    text(this.no, this.x - 9, this.y + 5);
  }

  this.clicked = function() {
    if (this.x - this.w / 2 < mouseX && this.x + this.w / 2 > mouseX &&
      this.y - this.h / 2 < mouseY && this.y + this.h / 2 > mouseY)
      return true;
    return false;
  }
}
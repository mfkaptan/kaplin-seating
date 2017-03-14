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
  this.guests = table.guests;

  this.draw = function() {
    fill("orange");
    noStroke();
    switch (this.type) {
      case TypeEnum.CIRCLE:
        ellipse(this.x, this.y, C_R, C_R);
        break;
      case TypeEnum.ARC:
        if (this.no % 2)
          arc(this.x - 10, this.y, C_R, C_R, PI * 1.5, PI * 4.5);
        else
          arc(this.x + 10, this.y, C_R, C_R, PI * 4.5, PI * 1.5);
        break;
      case TypeEnum.LONG:
        rectMode(CENTER);
        rect(this.x, this.y, L_W, L_H);
        break;
    }

    textSize(18);
    fill("#4B0082");
    text(this.no, this.x - 9, this.y + 5);
  }

  this.clicked = function() {
    console.log(this.x, this.y);
  }
}
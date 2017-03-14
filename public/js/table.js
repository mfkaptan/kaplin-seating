TypeEnum = {
  CIRCLE: 0,
  ARC: 1,
  LONG: 2
}
var C_R = 100,
  A_R = 80,
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
    fill("#F08080");
    noStroke();
    switch (this.type) {
      case TypeEnum.CIRCLE:
        ellipse(this.x, this.y, C_R, C_R);
        break;
      case TypeEnum.ARC:
        ellipse(this.x, this.y, A_R, A_R);
        break;
      case TypeEnum.LONG:
        ellipse(this.x, this.y, L_W, L_H);
    }

    textSize(18);
    fill("#4B0082");
    text(this.no, this.x - 9, this.y + 5);
  }

  this.clicked = function() {
    console.log(this.x, this.y);
  }
}
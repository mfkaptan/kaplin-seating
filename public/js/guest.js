function Guest(guest) {
  this.name = guest.name;
  this.id = guest._id;
  this.table = guest.table;
  this.gender = guest.gender;

  this.draw = function() {
    if (!this.table)
      return;
    fill("#4B0082");
    text("I", tables[this.table].x - 20, tables[this.table].y + 25);
  }
}
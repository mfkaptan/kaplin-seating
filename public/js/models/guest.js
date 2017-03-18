function Guest(guest) {
  this.name = guest.name;
  this.id = guest._id;
  this.table = parseInt(guest.table);
  this.size = parseInt(guest.size);
}
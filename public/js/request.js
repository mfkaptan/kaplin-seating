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
  $.post("/tables/" + table + "/guests", { guests: selectedGuests }, function() {
    getGuests();
    getTables();
  });
}

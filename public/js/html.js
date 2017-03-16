function appendSidebar(divId, guests) {
  $(divId).empty();

  const LI = '<a id="ID" href="#" class="list-group-item">NAME</a>';
  const N = "NAME";
  const ID = "ID";

  if (guests)
    guests.forEach(function(g) {
      $(divId).append(LI.replace(N, g.name).replace(ID, g.id));
    })
}
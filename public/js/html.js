function appendSidebar(divId, guests) {
  $(divId).empty();

  const LI = '<a id="_ID_" href="#" class="list-group-item">_NAME__SIZE_</a>';
  const SIZE = '<badge class="badge">_SIZE_</span>';
  const ID = "_ID_";
  const N = "_NAME_";
  const S = "_SIZE_";

  if (guests)
    guests.forEach(function(g) {
      let sizeBadge = SIZE.replace(S, g.size);
      let a = LI.replace(N, g.name).replace(ID, g.id).replace(S, sizeBadge);

      $(divId).append(a);
    })
}
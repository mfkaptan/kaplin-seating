function appendSidebar(divId, guests) {
  $(divId).empty();

  const LI = '<a id="_ID_" href="#" class="list-group-item">_NAME__SPAN_</a>';
  const SPAN = '<span class="badge">_SPAN_</span>';
  const N = "_NAME_";
  const ID = "_ID_";
  const S = "_SPAN_";

  if (guests)
    guests.forEach(function(g) {
      let a = LI.replace(N, g.name).replace(ID, g.id);
      let badge = "";

      if (g.table)
        badge = SPAN.replace(S, g.table);

      a = a.replace(S, badge);
      $(divId).append(a);
    })
}
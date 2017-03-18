function appendSidebar(divId, guests) {
  $(divId).empty();

  const LI = '<a id="_ID_" href="#" class="list-group-item">_NAME__SIZE__TABLE_</a>';
  const TABLE = '<label class="label label-success pull-right">M._TABLE_</label>';
  const SIZE = '<label class="label label-info pull-right">x_SIZE_</label>';
  const ID = "_ID_";
  const N = "_NAME_";
  const T = "_TABLE_";
  const S = "_SIZE_";

  if (guests)
    guests.forEach(function(g) {
      let tableLabel = "";
      if (g.table)
        tableLabel = TABLE.replace(T, g.table);

      let sizeBadge = SIZE.replace(S, g.size);
      let a = LI.replace(N, g.name).replace(ID, g.id).replace(S, sizeBadge).replace(T, tableLabel);
      $(divId).append(a);
    })
}

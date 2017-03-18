function appendSidebar(divId, guests) {
  $(divId).empty();

  const LI = '<a id="_ID_" href="#" class="list-group-item"> \
               <h5 class="list-group-item-heading">_NAME_</h5>\
               <p class="list-group-item-text">_TABLE__SIZE_</p></a>';
  const TABLE = '<label class="label label-success">Masa _TABLE_</label>';
  const SIZE = '<label class="label label-info pull-right">_SIZE_ kişi</label>';
  const ID = "_ID_";
  const N = "_NAME_";
  const T = "_TABLE_";
  const S = "_SIZE_";

  if (guests)
    guests.forEach(function(g) {
      let tableLabel = "-";
      if (g.table)
        tableLabel = TABLE.replace(T, g.table);

      let sizeBadge = SIZE.replace(S, g.size);
      let a = LI.replace(N, g.name).replace(ID, g.id).replace(T, tableLabel).replace(S, sizeBadge);
      $(divId).append(a);
    })
}

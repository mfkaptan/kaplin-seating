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

String.prototype.turkishToUpper = function(){
    var string = this;
    var letters = { "i": "İ", "ş": "Ş", "ğ": "Ğ", "ü": "Ü", "ö": "Ö", "ç": "Ç", "ı": "I" };
    string = string.replace(/(([iışğüçö]))+/g, function(letter){ return letters[letter]; })
    return string.toUpperCase();
}

function search() {
  // Declare variables
  var input, filter, ul, li;
  input =  $("#search-box").val();
  filter = input.turkishToUpper();

  let foundGuests = []

  // Loop through all list items, and hide those who don't match the search query
 if (input !== "") {
  for (let g in guests) {
    if (guests[g].name.turkishToUpper().indexOf(filter) > -1) {
      foundGuests.push(guests[g]);
    }
  }
 }

  appendSidebar("#searched-guests",foundGuests);
}

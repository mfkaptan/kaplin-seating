$(document).ready(getGuests)

function getGuests() {
  const LI = '<li><a href="#">NAME</a></li>';
  const N = "NAME";

  $.get("/guests", function(data) {
    for (let i = 0; i < data.length; i++) {
      $("#guest-list").append(LI.replace(N, data[i].name))
    }
  });
}
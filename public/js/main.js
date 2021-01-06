$(document).ready(function(){
    $('.parallax').parallax();
    $(".dropdown-trigger").dropdown();
$('.sidenav').sidenav();
  });

  $(function() {
    $(".chgStatus").on("click", function(event) {
      var id = $(this).data("id");

      $.ajax("/watchlist/" + id, {
        type: "PUT",
      }).then(
        function() {
          console.log("changed status", id);
          location.reload();
        }
      );
    });
  });
$(document).ready(function(){
    $('.parallax').parallax();
  });

  $(function() {
    $(".chgStatus").on("click", function(event) {
      var id = $(this).data("id");

      $.ajax("/api/watchlist/" + id, {
        type: "PUT",
      }).then(
        function() {
          console.log("changed status", id);
          location.reload();
        }
      );
    });
  
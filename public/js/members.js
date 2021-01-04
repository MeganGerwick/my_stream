const $ = window.$;

$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then((data) => {
    $(".member-name").text(data.email);
  });

  $(".dropdown-trigger").dropdown();
  $(".carousel").carousel();
  $(".sidenav").sidenav();

  let movieInfo = {
    title: "",
    movie: false,
    tv: false
  };

  $(".submitButton").click(function(event) {
    event.preventDefault();
      movieInfo.title = $("#search").val();
      let title = $("#search").val();
      let userEmail = $(".member-name").text();
      console.log(userEmail);
      // let type = "movie";
      // if ($(".moviesChkBox").is(':checked')) {
      //   movieInfo.movie = true;
      //   console.log(movieInfo);
      // } else {
      //   movieInfo.movie = false;
      // }

      // if ($('.tvChkBox').is(':checked')) {
      //   movieInfo.tv = true;
      //   console.log(movieInfo);
      // } else {
      //   movieInfo.tv = false;
      // }
      createNewPost(title, userEmail);
    });

  function createNewPost(title, user) {
    $.post("/api/api/watchlist/" + title + "/" + user, function() {
      console.log("SUCCESS!")
    })
  }
});

  // module.exports = {
  //   getMovieInformation,
  // };
// });

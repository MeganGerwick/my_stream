const $ = window.$;
const searchRes = $(".results");

$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then((data) => {
    $(".member-name").text(data.email);
  });

  $(".dropdown-trigger").dropdown();
  $(".carousel").carousel();
  $(".sidenav").sidenav();

  $(".submitButton").click(function(event) {
    event.preventDefault();
      let title = $("#search").val();
      let userEmail = $(".member-name").text();
      console.log(userEmail);
      // clear(searchRes);
      createNewPost(title, userEmail);
  
    });
  function createNewPost(title, user) {
    $.post("/api/api/watchlist/" + title + "/" + user, function() {
      getAllPosts(user);
    })
  }
  function getAllPosts(user) {
    $.get("/api/api/watchlist/" + user, function(results) {
    createCard(results);
    });
  }


  function createCard(results) {
    let card = $("<div>").addClass("card");
      let poster = $("<div>").addClass(
        "poster card-image waves-effect waves-block waves-light"
      );
      let image = $("<img>")
      .addClass("activator")
      .attr("src", results[0].poster)
      .attr("alt", results[0].title);

      let reveal = $("<div>")
      .addClass("card-reveal");
    
  

      let title = $("<span>")
      .addClass("card-title grey-text text-darken-4")
      .text("" + results[0].title);

      let info = $("<ul>");

      let year = $("<li>")
      .text("" + results[0].year);
      let rating = $("<li>").text(""+ results[0].rating);
      let plot = $("<li>").text(""+ results[0].plot);
     
      title.appendTo(reveal);
      info.appendTo(title);
        year.appendTo(info);
        rating.appendTo(info);
        plot.appendTo(info);
        poster.append(image).appendTo(card);
        reveal.appendTo(card);
        card.appendTo(searchRes);
  }
});



  // module.exports = {
  //   getMovieInformation,
  // };
// });

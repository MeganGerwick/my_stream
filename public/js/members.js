const $ = window.$;
const searchRes = $(".results");
let title;
let userEmail;

$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then((data) => {
    $(".member-name").text(data.email);
  });

  $(".dropdown-trigger").dropdown();
  $(".carousel").carousel();
  $(".sidenav").sidenav();

  $(".submitButton").click(function (event) {
    event.preventDefault();
    searchRes.empty();
    title = $("#search").val();
    userEmail = $(".member-name").text();
    console.log(userEmail);
    createNewPost(title, userEmail);
  });
  function createNewPost(title, user) {
    $.post("/api/api/search/" + title + "/" + user, function () {
      getAllPosts(user);
    });
  }
  function getAllPosts(user) {
    $.get("/api/api/search/" + user, function (results) {
      createCard(results);
    });
  }

  $('.results').on('click', 'button', function (event) {
    var target = event.target;
    console.log(target);
    if (target.matches('button')) {
      var idInfo = target.getAttribute('id');
      console.log(idInfo);
      if (idInfo === "notwatched") {
        var watched = false;
        $.post("/api/api/watchlist/" + title + "/" + userEmail + "/" + watched, function () {
          console.log("watchedsuccess")
        });
      }
      if (idInfo === "havewatched") {
        var watched = true;
        $.post("/api/api/watchlist/" + title + "/" + userEmail + "/" + watched, function () {
          console.log("watchedsuccess")
        });
    }
    
    }
    console.log(title);
    console.log(userEmail);
  })
  function createCard(results) {
    let card = $("<div>").addClass("card");
    let poster = $("<div>").addClass(
      "poster card-image waves-effect waves-block waves-light"
    );
    console.log(results);
    let arrayLength = (results.length - 1);
    console.log(arrayLength);
    let image = $("<img>")
      .addClass("activator")
      .attr("src", results[arrayLength].poster)
      .attr("alt", results[arrayLength].title);

    let reveal = $("<div>").addClass("card-reveal");

    let title = $("<span>")
      .addClass("card-title grey-text text-darken-4")
      .text("" + results[arrayLength].title);

    let info = $("<ul>");

    let year = $("<li>").text("" + results[arrayLength].year);
    let rating = $("<li>").text("" + results[arrayLength].rating);
    let plot = $("<li>").text("" + results[arrayLength].plot);

    let watchLinks = $("<div>").addClass("card-action");
    let linksPara = $("<p>");
    let button1 = $("<button>")
      .attr("href", "havewatched")
      .attr("id", "havewatched")
      .addClass("btn")
      .text("Seen It!")
      .appendTo(linksPara);
    let button2 = $("<button>")
      .attr("href", "notwatched")
      .attr("id", "notwatched")
      .addClass("btn flow-text")
      .text("Add to List!")
      .appendTo(linksPara);

    title.appendTo(reveal);
    info.appendTo(title);
    year.appendTo(info);
    rating.appendTo(info);
    plot.appendTo(info);
    poster.append(image).appendTo(card);
    reveal.appendTo(card);
    watchLinks.appendTo(reveal);
    button1.appendTo(watchLinks);
    button2.appendTo(watchLinks);
    card.appendTo(searchRes);
  }
});

// module.exports = {
//   getMovieInformation,
// };
// });

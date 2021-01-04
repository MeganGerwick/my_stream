// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
const router = require("express").Router();
const util = require("util");
var db = require("../../models");
var movieAPI = require("./helper/movie.js");

// Routes
// =============================================================
// GET route for getting all of the todos
router.route("/api/watchlist").get(function(req, res) {
  // findAll returns all entries for a table when used with no options
  db.Watchlist.findAll({}).then(function(dbWatchlist) {
    // We have access to the todos as an argument inside of the callback function
    res.json(dbWatchlist);
  });
});

router.route("/api/watchlist/:user").get(function(req, res) {
  let userEmail = req.params.user;
  db.Watchlist.findAll(
    {
      where: {
        user: userEmail
      }
    }).then(function(dbWatchlist) {
      for (let i = 0; i < dbWatchlist.length; i++) {
        // this is going to cycle through all the dataValues and
        // give us the objects that they hold there depending on
        // which user is input, we can then use that information
        // to build the cards
        console.log(dbWatchlist[i].dataValues);
      }
  })
});

// ***** THIS WHOLE POST ROUTE MIGHT BE WORTHLESS NOW
// ***** WILL DELETE LATER IF NOT NEEDED
// // POST route for saving a new watchlist
// router.route("/api/watchlist").post(async function(req, res) {
//   // create takes an argument of an object describing the item we want to
//   // insert into our table. In this case we just we pass in an object with a text
//   // and complete property
//   movieAPI.searchForMovie().then((results) => {
//     let movie = {};
//     let movieDate = results.results[0].release_date;
//     let movieYear = parseInt(movieDate.slice(0, 4));
//     let movieID = results.results[0].id;
//     movie = {
//       title: results.results[0].original_title,
//       year: movieYear,
//       rated: "R",
//       genre: results.results[0].genre_ids[0],
//       plot: results.results[0].overview,
//       poster:
//         "https://image.tmdb.org/t/p/w500" + results.results[0].poster_path,
//       rating: results.results[0].vote_average,
//       user: "Christian",
//       watched: true,
//       // streaming: streamingInfo,
//     };
//     db.Watchlist.create(movie).then(function(dbWatchlist) {
//       // We have access to the new todo as an argument inside of the callback function
//       res.json(dbWatchlist);
//       // db.Watchlist.update({
//       //   title: results.results[0].original_title,
//       //   // year: results.results[0].release_date,
//       //   year: movieYear,
//       //   rated: "R",
//       //   genre: results.results[0].genre_ids[0],
//       //   plot: results.results[0].overview,
//       //   poster:
//       //     "https://image.tmdb.org/t/p/w500" + results.results[0].poster_path,
//       //   rating: results.results[0].vote_average,
//       //   user: "Christian",
//       //   watched: true,
//       // },
//       // {
//       //   where: {
//       //     id: NEEDSTUFFHERE
//       //   }
//       // });
//     });
//   });
// });

// Creates a new post to our watchlist table
router.route("/api/watchlist/:title/:user").post(async function(req, res) {
  let movieTitle = req.params.title;
  let userEmail = req.params.user;
  console.log("line 80 ", userEmail);
  movieAPI.searchForMovie(movieTitle).then((results) => {
    let movie = {};
    let movieDate = results.results[0].release_date;
    let movieYear = parseInt(movieDate.slice(0, 4));
    let movieID = results.results[0].id;
    console.log("line 86", movieID);
    movie = {
      title: req.params.title,
      year: movieYear,
      genre: results.results[0].genre_ids[0],
      plot: results.results[0].overview,
      poster:
        "https://image.tmdb.org/t/p/w500" + results.results[0].poster_path,
      rating: results.results[0].vote_average,
      user: userEmail,
      movieID: movieID,
    };
    db.Watchlist.create(movie).then(function(dbWatchlist) {
      // We have access to the new todo as an argument inside of the callback function
      res.json(dbWatchlist);
      console.log("line 105", userEmail);
      console.log("line 106", movieID);
      movieAPI.whereToWatch(movieID).then((results) => {
        console.log("line 108", userEmail);
        let usResults = results.results.US;
        // console.log(usResults);
        let rentResults = [];
        let flatrateResults = [];
        let buyResults = [];
        // console.log(results.results.US.rent);
        for (let i = 0; i < usResults.rent.length; i++) {
          rentResults.push(usResults.rent[i].provider_name);
        }

        for (let i = 0; i < usResults.flatrate.length; i++) {
          flatrateResults.push(usResults.flatrate[i].provider_name);
        }

        for (let i = 0; i < usResults.buy.length; i++) {
          buyResults.push(usResults.buy[i].provider_name);
        }
        rentResults = rentResults.toString();
        flatrateResults = flatrateResults.toString();
        buyResults = buyResults.toString();
        db.Watchlist.update(
          {
            rent: rentResults,
            flatrate: flatrateResults,
            buy: buyResults,
          },
          {
            where: {
              user: userEmail,
            },
          }
        );
        console.log(rentResults);
        console.log(flatrateResults);
        console.log(buyResults);
        // console.log(usResults);
      });
    });
  });
});

// DELETE route for deleting todos. We can get the id of the todo to be deleted from
// req.params.id
router.route("/api/watchlist/:id").delete(function(req, res) {
  // Use the sequelize destroy method to delete a record from our table with the
  // id in req.params.id. res.json the result back to the user
  db.Watchlist.destroy({
    where: {
      id: req.params.id,
    },
  }).then(function(dbWatchlist) {
    res.json(dbWatchlist);
  });
});

// PUT route for updating todos. We can get the updated todo data from req.body
router.route("/api/watchlist").put(function(req, res) {
  // Use the sequelize update method to update a todo to be equal to the value of req.body
  // req.body will contain the id of the todo we need to update
  db.Watchlist.update(
    {
      title: req.body.title,
      year: req.body.year,
      rated: req.body.year,
      genre: req.body.genre,
      plot: req.body.plot,
      poster: req.body.poster,
      rating: req.body.rating,
      streaming: req.body.streaming,
      user: req.body.user,
      watched: req.body.watched,
    },
    {
      where: {
        id: req.body.id,
      },
    }
  ).then(function(dbTodo) {
    res.json(dbTodo);
  });
});

module.exports = router;

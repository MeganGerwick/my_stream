const fetch = require("node-fetch");
const bluebird = require("bluebird");
fetch.promise = bluebird;

let API_KEY = "e84c7c8e45cf9ee6ec79d9c662ff6222";
// let userMovie = 'Django Unchained';

function searchForMovie(userMovie) {
  return fetch(
    "https://api.themoviedb.org/3/search/movie?api_key=" +
      API_KEY +
      "&language=en-US&query=" +
      userMovie
  ).then((response) => {
    return response.json();
  });
}

// searchForMovie(userMovie);

// whereToWatch(movieID);

function whereToWatch(movieID) {
  return fetch(
    "https://api.themoviedb.org/3/movie/" +
      movieID +
      "/watch/providers?api_key=" +
      API_KEY
  ).then((response) => {
    return response.json();
  });
}

// function getMovieCertifications(movieID)

module.exports = {
  searchForMovie,
  whereToWatch,
};

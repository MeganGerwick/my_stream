let API_KEY = "e84c7c8e45cf9ee6ec79d9c662ff6222";
const connection = require('../config/connection.js');

//Search for a specific movie https://api.themoviedb.org/3/search/movie?api_key=e84c7c8e45cf9ee6ec79d9c662ff6222&language=en-US&query=Harry%20Potter%20and%20the%20Sorcerer%27sStone
function searchForMovie() {
  let userMovie = "Django Unchained";
  let queryURL =
    "https://api.themoviedb.org/3/search/movie?api_key=" +
    API_KEY +
    "&language=en-US&query=" +
    userMovie;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {
    // console.log(response);
    // let title = response.results[0].title;
    // let posterURL = response.results[0].poster_path;
    // let rating = response.results[0].vote_average;
    // let releaseDate = response.results[0].release_date;
    // let summary = response.results[0].overview;
    // let genreID = response.results[0].genre_ids[0];
    let movieID = response.results[0].id;
    let streaming = whereToWatch(movieID);
    // object.entries
    let movie = {
      title: response.results[0].title,
      year: response.results[0].release_date,
      // rated: ????,
      genre: response.results[0].genre_ids[0],
      plot: response.results[0].overview,
      poster: "https://image.tmdb.org/t/p/w500" + response.results[0].poster_path,
      rating: response.results[0].vote_average,
      streaming: streaming,
      // user: ????,
      // watched: ????
    }
    
    // Poster Path: "https://image.tmdb.org/t/p/w500" + POSTER_URL;
  });
}

//Search for a specific actor https://api.themoviedb.org/3/search/person?api_key=e84c7c8e45cf9ee6ec79d9c662ff6222&language=en-US&query=Daniel%20Radcliffe
function searchForActor() {
  let userActor = "Daniel Radcliffe";
  let queryURL =
    "https://api.themoviedb.org/3/search/person?api_key=" +
    API_KEY +
    "&language=en-US&query=" +
    userActor;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {
    console.log(response);
    let id = response.results[0].id;
    console.log(id);
  });
}

//Search for a specific TV show https://api.themoviedb.org/3/search/tv?api_key=e84c7c8e45cf9ee6ec79d9c662ff6222&language=en-US&query=The%20Good%20Place
function searchForTVShow() {
  let userTVShow = "The Good Place";
  let queryURL =
    "https://api.themoviedb.org/3/search/tv?api_key=" +
    API_KEY +
    "&language=en-US&query=" +
    userTVShow;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {
    console.log(response);
    let id = response.results[0].id;
    console.log(id);
  });
}

//Get the official list of genres for all movies https://api.themoviedb.org/3/genre/movie/list?api_key=e84c7c8e45cf9ee6ec79d9c662ff6222&language=en-US
function getMovieGenres() {
  let queryURL =
    "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
    API_KEY +
    "&language=en-US";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {
    let movieGenres = [];
    for (let i = 0; i < response.genres.length; i++) {
      movieGenres.push(response.genres[i].name);
    }
    console.log(movieGenres);
  });
}

//Get the official list of genres for all tv shows https://api.themoviedb.org/3/genre/tv/list?api_key=e84c7c8e45cf9ee6ec79d9c662ff6222&language=en-US
function getTVGenres() {
  let queryURL =
    "https://api.themoviedb.org/3/genre/tv/list?api_key=" +
    API_KEY +
    "&language=en-US";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {
    console.log(response);
    let tvGenres = [];
    for (let i = 0; i < response.genres.length; i++) {
      tvGenres.push(response.genres[i].name);
    }
    console.log(tvGenres);
  });
}

//Search for similar movies https://api.themoviedb.org/3/movie/671/similar?api_key=e84c7c8e45cf9ee6ec79d9c662ff6222&language=en-US  <-- WILL NEED ID OF THE MOVIE
function searchSimilarMovies(movieID) {
  let queryURL =
    "https://api.themoviedb.org/3/movie/" +
    movieID +
    "/similar?api_key=" +
    API_KEY +
    "&language=en-US";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {
    console.log(response);
    let similarMovies = [];
    for (let i = 0; i < response.results.length; i++) {
      similarMovies.push(response.results[i].title);
    }
    console.log(similarMovies);
    return similarMovies;
  });
}

//Trending movies https://api.themoviedb.org/3/trending/movie/day?api_key=e84c7c8e45cf9ee6ec79d9c662ff6222
function findTrendingMovies(dayOrWeek) {
  let queryURL =
    "https://api.themoviedb.org/3/trending/movie/" +
    dayOrWeek +
    "?api_key=" +
    API_KEY;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {
    console.log(response);
    let trendingMovies = [];
    for (let i = 0; i < response.results.length; i++) {
      trendingMovies.push(response.results[i].title);
    }
    console.log(trendingMovies);
  });
}

//Trending TV shows https://api.themoviedb.org/3/trending/tv/day?api_key=e84c7c8e45cf9ee6ec79d9c662ff6222
function findTrendingTVShows(dayOrWeek) {
  let queryURL =
    "https://api.themoviedb.org/3/trending/tv/" +
    dayOrWeek +
    "?api_key=" +
    API_KEY;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {
    console.log(response);
    let trendingTVShows = [];
    for (let i = 0; i < response.results.length; i++) {
      trendingTVShows.push(response.results[i].name);
    }
    console.log(trendingTVShows);
  });
}

//Get services of "Where to Watch" https://api.themoviedb.org/3/movie/550/watch/providers?api_key=e84c7c8e45cf9ee6ec79d9c662ff6222
function whereToWatch(movieID) {
  let queryURL =
    "https://api.themoviedb.org/3/movie/" +
    movieID +
    "/watch/providers?api_key=" +
    API_KEY;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {
    console.log(response);
    console.log(response.results.US);
  });
}

//Get movies in theatres now https://api.themoviedb.org/3/movie/now_playing?api_key=e84c7c8e45cf9ee6ec79d9c662ff6222&language=en-US&region=US
function getTheatreMovies() {
  let queryURL =
    "https://api.themoviedb.org/3/movie/now_playing?api_key=" +
    API_KEY +
    "&language=en-US&region=US";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {
    console.log(response);
    let theatreMovies = [];
    for (let i = 0; i < response.results.length; i++) {
      theatreMovies.push(response.results[i].title);
    }
    console.log(theatreMovies);
  });
}

let API_KEY = "e84c7c8e45cf9ee6ec79d9c662ff6222";

//Search for a specific movie https://api.themoviedb.org/3/search/movie?api_key=e84c7c8e45cf9ee6ec79d9c662ff6222&language=en-US&query=Harry%20Potter%20and%20the%20Sorcerer%27sStone
function searchForMovie() {
  let userMovie = "Harry Potter and The Sorcerer's Stone";
  let queryURL =
    "https://api.themoviedb.org/3/search/movie?api_key=" +
    API_KEY +
    "&language=en-US&query=" +
    userMovie;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {
    console.log(response);
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

//Search for similar movies https://api.themoviedb.org/3/movie/671/similar?api_key=e84c7c8e45cf9ee6ec79d9c662ff6222&language=en-US  <-- WILL NEED ID OF THE MOVIE

//Trending movies https://api.themoviedb.org/3/trending/movie/day?api_key=e84c7c8e45cf9ee6ec79d9c662ff6222

//Trending TV shows https://api.themoviedb.org/3/trending/tv/day?api_key=e84c7c8e45cf9ee6ec79d9c662ff6222

//Get services of "Where to Watch" https://api.themoviedb.org/3/movie/550/watch/providers?api_key=e84c7c8e45cf9ee6ec79d9c662ff6222

//Get movies in theatres now https://api.themoviedb.org/3/movie/now_playing?api_key=e84c7c8e45cf9ee6ec79d9c662ff6222&language=en-US&region=US
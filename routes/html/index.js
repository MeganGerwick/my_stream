// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../../config/middleware/isAuthenticated");
const router = require("express").Router();
const db = require("../../models");

router.get("/", (req, res) => {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/welcome");
  }

  res.sendFile(path.join(__dirname, "../../public/signup.html"));
});

router.get("/login", (req, res) => {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/welcome");
  }

  res.sendFile(path.join(__dirname, "../../public/login.html"));
});

// Route for logging user out
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
router.get("/welcome", isAuthenticated, (_req, res) => {
  res.sendFile(path.join(__dirname, "../../public/search.html"));
});

router.get("/search", isAuthenticated, (_req, res) => {
  res.sendFile(path.join(__dirname, "../../public/search.html"));
});

router.get("/watchlist", isAuthenticated, (req, res) => {
  const email = req.user.email;
  console.log(req.user.email);

  db.Watchlist.findAll({
    where: {
      user: email,
    },
  }).then(function(userWatchList) {
    console.log(userWatchList);
    const watchlist = userWatchList.map((movie) => {
      return movie.dataValues;
    });
    console.log(watchlist);
    res.render("index", { movie: watchlist });
  });
});

router.put("/watchlist/:id", isAuthenticated, (req, res) => {
  db.Watchlist.update({ watched: true }, { where: { id: req.params.id } })
    .then(function(rowsUpdated) {
      res.json(rowsUpdated);
    })
    .catch();
});

module.exports = router;

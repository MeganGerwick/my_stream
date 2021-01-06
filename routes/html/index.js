// Requiring path to so we can use relative routes to our HTML files
const path = require('path');
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require('../../config/middleware/isAuthenticated');
const router = require('express').Router();

router.get('/', (req, res) => {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect('/members');
  }

  res.sendFile(path.join(__dirname, '../../public/signup.html'));
});

router.get('/login', (req, res) => {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect('/members');
  }

  res.sendFile(path.join(__dirname, '../../public/login.html'));
});

// Route for logging user out
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Here we've add our isAuthenticated middleware to this route.
// If a user who is not logged in tries to access this route they will be redirected to the signup page
router.get('/members', isAuthenticated, (_req, res) => {
  res.sendFile(path.join(__dirname, '../../public/members.html'));
});

router.get('/search', isAuthenticated, (_req, res) => {
  res.sendFile(path.join(__dirname, '../../public/search.html'));
})

router.get('/watchlist', isAuthenticated, (_req, res) => {
  // 1. what user called and their id
  // 2. call database
  // 3. pass into 2nd arg of res.render
  res.render("index", {});
})


module.exports = router;

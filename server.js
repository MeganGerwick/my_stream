// Requiring necessary npm packages
require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const helmet = require('helmet');
const morgan = require('morgan');
// Requiring passport as we've configured it
const passport = require('./config/passport');
const routes = require('./routes');

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const SYNC_OPTIONS = {
  force: process.env.NODE_ENV === 'test'
};

const db = require('./models');

// Creating express app and configuring middleware needed for authentication
const app = express();

// Set Handlebars as the default template engine.
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(
  helmet({
    contentSecurityPolicy: false
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
// We need to use sessions to keep track of our user's login status
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('tiny'));

// Requiring our routes
app.use(routes);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync(SYNC_OPTIONS).then(() => {
  app.listen(PORT, () => {
    console.log(
      '==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.',
      PORT,
      PORT
    );
  });
});

//REQUIRE LIBRARIES
require('dotenv').config();
const express = require('express');

//DEFINE APP
const app = express();

app.use(express.static('public'))

//Set database
require('./data/reddit-db');

//Middleware--------------------------------
const exphbs  = require('express-handlebars');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const checkAuth = (req, res, next) => {
  console.log("Checking authentication");
  if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }
  next();
};

app.use(cookieParser()); // Add this after you initialize express.

//Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'home'}));
app.set('view engine', 'handlebars');

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());

// Add after express init
app.use(checkAuth);

// Routes
app.get('/posts/new', (req, res) => {
  //Render the post view
  res.render('posts-new');
})

//Controllers
require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);
require('./controllers/replies.js')(app);

app.listen(3000, () => {
  console.log('Reddit clone on port localhost:3000!');
});

module.exports = app;
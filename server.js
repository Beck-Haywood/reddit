require('dotenv').config();
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

app.use(cookieParser()); // Add this after you initialize express.

// Use Body Parser
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//CheckAuth
var checkAuth = (req, res, next) => {
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
app.use(checkAuth);

const exphbs  = require('express-handlebars');

// Add after body parser initialization!
app.use(expressValidator());



// Set db
require('./data/reddit-db');

// Routes


app.get('/posts/new', (req, res) => {
  res.render('posts-new')
})

require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);




app.listen(port, () => console.log(`Example app listening on port ${port}!`));



app.engine('handlebars', exphbs({defaultLayout: 'home'}));
app.set('view engine', 'handlebars');

module.exports = app;


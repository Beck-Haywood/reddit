const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// Use Body Parser
// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const exphbs  = require('express-handlebars');

// Add after body parser initialization!
app.use(expressValidator());


require('./controllers/posts.js')(app);

// Set db
require('./data/reddit-db');

// Routes


app.get('/posts/new', (req, res) => {
  res.render('posts-new')
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`));


app.engine('handlebars', exphbs({defaultLayout: 'home'}));
app.set('view engine', 'handlebars');

module.exports = app;


const express = require('express');
const app = express();
const port = 3000;

// Middleware
const exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'home'}));
app.set('view engine', 'handlebars');

// Routes
app.get('/', (req, res) => {
    res.render('index')
  })
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

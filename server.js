const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');



app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Inable to append to server.log')
    }
  });
  next();
});

//app.use((req, res, next) =>{
//  res.render('maintenance.hbs');
//});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'A Home Page',
    messageHome: 'Welcome to our nothing doing website'
  });
});

app.get('/about', (req, res) =>{
  res.render('about.hbs', {
    pageTitle: 'An About Page'
  });
})

app.get('/bad', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  res.send({
    error: 'not Found !',
    error2: 'The page you requested doesnt exist'
  })
});
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

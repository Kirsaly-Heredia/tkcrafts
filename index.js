//project entry point
var express = require('express');
var handlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var Mongoose = require('mongoose');

var app = express();

require('dotenv').config();

Mongoose.connect(process.env.DB_URL);

var portNum = 8888;
app.set('port', portNum);

// set up handlebars view engine
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var api = require('./routes/api');
app.use('/api', api);

var product = require('./routes/products');
app.use('/', product);

//site routes-----------------------
app.get('/', function (req, res) {
  res.render('home');
});

app.get('/add', function (req, res) {
  res.render('add');
});

app.get('/login', function (req, res) {
  res.render('login');
});

app.get('/browse', function (req, res) {
  res.render('browse');
});

app.get('/product', function (req, res) {
  res.render('product');
});

app.get('/about', function (req, res) {
  res.render('about');
});


app.use(express.static('public'));

// custom 404 page
app.use(function (req, res, next) {
  res.status(404);
  res.render('404', {layout: 'plain_views'});
});

// custom 500 page
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('500', {layout: 'plain_views'});
});

// start server
app.listen(portNum, function () {
  console.log('listening on port ', portNum);
});
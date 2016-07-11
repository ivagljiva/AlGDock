// This is the primary control script for the web application. It accesses most dependencies, connects to the database,
// sets paths to the directories containing our other javascript and html files, and handles errors.


// dependencies
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./routes/index');
var users = require('./routes/users');
var hogan = require('hjs');

var app = express();

// database connection
mongoose.connect('mongodb://localhost/algdock');

// view engine setup - for res.render()
app.set('views', path.join(__dirname, 'views')); //  sets all html templates to be in views/ directory
app.set('view engine', 'hjs');	//html templates are in .hjs format

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // most of our code is in the public/ directory

app.use('/', routes); // the root location for the web app (ie, 'localhost:3000/') is pointed to /routes/index.js (see var routes above)
app.use('/users', users); // 'localhost:3000/users' is pointed to /routes/users.js (see var users above)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app; // when app.js is required in other scripts, this line ensures that all of the above code/functions
					  // are accessible to those scripts

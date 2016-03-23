var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var routes = require('./routes/index');
var users = require('./routes/users');
var flash = require('connect-flash');
var debug = require('debug');
var app = express();
require('./db');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash());
app.set('port', process.env.PORT || 3000);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var half_hour = 3600000 / 2;

app.use((req,res,next) => {
  req.model = require('./models/index');
  next();
});

app.use(session({
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  secret: '123',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: half_hour
  }
}));

app.use('/', routes);
app.use('/user', users);

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

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

module.exports = app;

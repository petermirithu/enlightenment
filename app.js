var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
<<<<<<< HEAD
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('cookie-session');
var db = require('./models/index');
var http    = require('http')

const passport = require('passport');
=======
>>>>>>> e100a71af6da32effbcb14a1bf1ca112a193289c

var routes = require('./routes/index');
var users = require('./routes/users');

<<<<<<< HEAD

=======
>>>>>>> e100a71af6da32effbcb14a1bf1ca112a193289c
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
<<<<<<< HEAD
app.use(expressValidator());
app.use(session({ cookie: { maxAge: 60000 }, 
    secret: 'wosdwswdwdwdwqdwqddqwdwdqdqwot',
    resave: false, 
    saveUninitialized: false}));
// express-messages middleware for flash
app.use(flash());
app.use((req, res, next) => {
  res.locals.errors = req.flash("error");
  res.locals.successes = req.flash("success");
  next();
});

// passport middleware
app.use(passport.initialize());
app.use(passport.session());
    
app.use('/', routes);
app.use('/user', users);


// passport config
require('./config/passport')(passport);
=======

app.use('/', routes);
app.use('/users', users);
>>>>>>> e100a71af6da32effbcb14a1bf1ca112a193289c

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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

app.set('port', process.env.PORT || 3000);

db.sequelize.sync().then(function() {
    http.createServer(app).listen(app.get('port'), function(){
      console.log('Express server listening on port ' + app.get('port'));
      console.log('http://localhost:3000/')
    });
});

module.exports = app;

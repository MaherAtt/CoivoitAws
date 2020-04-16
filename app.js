var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var rechercherRouter = require('./routes/rechercher');
var inscriptionRouter = require('./routes/inscription');
var connexionRouter = require('./routes/login');
var profileRouter = require('./routes/profil');
var proposerRouter = require('./routes/proposer');
var messagerieRouter = require('./routes/messagerie');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var logOutRouter = require('./routes/logout');
var PosterRouter = require('./routes/poster');
var demande = require('./routes/demande');
var repondre = require('./routes/repondre');
var recherche_profil = require('./routes/recherche_profil');
var reserver = require('./routes/reserver');
var messages = require('./routes/messages');
var upload=require('./routes/upload');

var app = express();
//msgerie
var server = require('http').Server(app);
var io = require('socket.io')(server);



app.use(express.static(path.join(__dirname, 'public')));
// view engine setup
var cons = require('consolidate');

const session = require('express-session');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: 'secretCovoiturage',saveUninitialized: true,resave: true}));


//msg
app.use(function(req, res, next){
    res.io = io;
    next();
});


var mysql = require('mysql');

var connection = mysql.createPool({
    host     : 'us-cdbr-iron-east-01.cleardb.net',
    user     : 'b68f308ddca3d1',
    password : '754810b0',
    database : 'heroku_d1dd061e72cfd25'
});
// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var sess;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/profil', profileRouter);
app.use('/inscription', inscriptionRouter);
app.use('/connexion', connexionRouter);
app.use('/rechercher', rechercherRouter);
app.use('/proposer',proposerRouter);
app.use('/messagerie',messagerieRouter);
app.use('/register',registerRouter);
app.use('/login',loginRouter);
app.use('/logout',logOutRouter);
app.use('/poster',PosterRouter);
app.use('/demande',demande);
app.use('/search',recherche_profil);
app.use('/repondre',repondre);
app.use('/reserver',reserver);
app.use('/messages',messages);
app.use('/upload',upload);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});







module.exports = {app: app, server: server};
exports.connection=connection;
//module.exports = app;

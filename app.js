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

var app = express();

app.use(express.static('public'));
// view engine setup
var cons = require('consolidate');
const session = require('express-session');
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({secret: 'secretCovoiturage',saveUninitialized: true,resave: true}));
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



//messagerie
/*let io = require('socket.io');
let lastMessage = new Array();
io.on('connection', function(client){

client.emit('last message', lastMessage);


client.on('new message', function(data){
    // Vérification du pseudonyme
    if(!data.username || typeof data.username == undefined || data.username.length > 25){
        client.emit('error message', "Le pseudonyme rentré n'est pas valide !");
        return;
    }

    // Vérification du message
    if(!data.message || typeof data.message == undefined || data.message.length > 255){
        client.emit('error message', "Le message rentré n'est pas valide !");
        return;
    }
    lastMessage.push(data.username + ' : ' + data.message);
    for(var i = lastMessage.length-1; i--;){
        if(i == 4){
            lastMessage.shift();
        }
    }
    io.emit('new message', data);
});

client.on('disconnect', function(){
    delete client;
});

});
*/



module.exports = app;

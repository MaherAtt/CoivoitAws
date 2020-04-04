var express = require('express');
var fs=require('fs');
var router = express.Router();
var moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.Username)
    res.render('proposer');
    else
    res.redirect('./');
});

router.post('/', function(req, res, next) {
var adrDep=req.body.adrDepart;
    var adrDest=(req.body.adrDestination);
    var dateDep=req.body.dateDep;
    var heureDep=req.body.heureDep;
    var prix=req.body.prix;
    var details=req.body.commentaire;
    adrDep=adrDep.replace("'"," ");
    adrDest=adrDep.replace("'"," ");
    dateDep=dateDep+' '+heureDep;
    console.log(dateDep);
    moment.locale('fr');
    var dateStr = moment(dateDep, 'DD MMM YYYY HH:mm').format('YYYY-MM-DD HH:mm:ss');

    var mysql = require('mysql');
    var bodyParser=require("body-parser");
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'covoitaws'
    });

    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
    var data=[req.session.Username,adrDep,adrDest,dateStr,4,prix,details];

    connection.query('INSERT INTO trajets SET IdChauffeur =?,AdresseDep=?, AdresseArr=?,DateDep=?, NbPlaces=?, Prix=?,Details=?',data,function(err,result){
        console.log(err);
    })

    res.redirect('./proposer');





});

module.exports = router;

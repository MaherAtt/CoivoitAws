var express = require('express');
var fs=require('fs');
var router = express.Router();
function Inscription(prenom, nom, email, mdp,univ){
    var mysql      = require('mysql');
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

    let crypto = require('crypto')
    const hash = crypto.createHmac('sha256', mdp)
        .update('I love cupcakes')
        .digest('hex');



            var data = [email, hash]
            var dataProf= [email,nom, prenom,univ,'default_pic.png',4]
            connection.query('INSERT INTO accounts SET Username =?, Password=?',data,function(err,result){

            })
            connection.query('INSERT INTO profils SET Username =?,Nom=?,Prenom=?, University=?, Picture=?, Note=?',dataProf,function(err,result){

            })


    }


/* GET home page. */
router.post('/', function(req, res, next) {
    var email=req.body.EmailReg;
    var name=req.body.NomReg;
    var surname=req.body.PrenomReg;
    var password=req.body.MdpReg;
    var university=req.body.University;
    Inscription(surname,name,email,password,university);
    sess=req.session;
    sess.erreur='Vous avez été enregistré avec succes';
    res.redirect('.');
});

module.exports = router;

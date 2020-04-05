var express = require('express');
var fs=require('fs');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('proposer');
});

router.post('/', function(req, res, next) {
    var user=req.session.nom+" "+req.session.prenom ;
    var message=req.body.commentaire;

    var mysql = require('mysql');
    var bodyParser=require("body-parser");
    var connection = mysql.createConnection({
        host     : 'us-cdbr-iron-east-01.cleardb.net',
        user     : 'b68f308ddca3d1',
        password : '754810b0',
        database : 'heroku_d1dd061e72cfd25'
    });

    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
    var data=[req.session.Username,req.body.profilOf,0,req.body.commentaire,4];
    connection.query('INSERT INTO avis SET IdEmmeteur =?,IdRecepteur=?, Sens=?,Commentaire=?, Note=?',data,function(err,result){

    })

    res.redirect('./profil');
});

module.exports = router;

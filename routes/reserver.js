var express = require('express');
var router = express.Router();
var app=require('../app');
/* GET users listing. */
router.post('/', function(req, res, next) {

    data=[req.body.Emmeteur,req.body.Trajet,req.body.Chauffeur,req.body.Message,new Date(),2];
    app.connection.query('INSERT INTO demandes SET IdEmmeteur=?, IdTrajet=?,IdRecepteur =?, Message=?,DateDem=?, Etat=?',data,function(err,result){
       console.log(err);
        res.redirect('./Demande');
    })
});

module.exports = router;

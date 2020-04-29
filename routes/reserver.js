var express = require('express');
var router = express.Router();
var app=require('../app');
/* GET users listing. */
router.post('/', function(req, res, next) {
    /*Lorsqu'un utilisateur souhaite participer à un voyage, ce dernier fait une demande de réservation auprès du conducteur en lui envoyant un msg.*/
    data=[req.session.Username,req.body.Trajet,req.body.Trajet,req.body.Message,new Date(),2];
    app.connection.query('INSERT INTO demandes SET IdEmmeteur=?, IdTrajet=?,IdRecepteur =(Select IdChauffeur from Trajets T where T.IdTrajet=?), Message=?,DateDem=?, Etat=?',data,function(err,result){
       console.log(err);
        res.redirect('./Demande');
    })
});

module.exports = router;

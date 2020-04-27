var express = require('express');
var router = express.Router();
var app=require('../app');
/* GET users listing. */
router.post('/', function(req, res, next) {
    /*MAJ de l'état d'une  demande __ acceptée/refusée ainsi que du nombre de places dispo*/
    var Repo;
    if(req.body.Reponse=="Accepter") Repo=true;
    else Repo=false;
    data=[Repo,req.body.Emmeteur,req.body.Trajet];
    app.connection.query('Update demandes set Etat=? where IdEmmeteur=? and IdTrajet=?',data,function(err,result){

    })

    if(Repo==true){
        app.connection.query('Update trajets set NbPlaces=NbPlaces-1 where IdTrajet=? ',req.body.Trajet,function(err,result){

        })
    }
    res.redirect('./demande');
});

module.exports = router;

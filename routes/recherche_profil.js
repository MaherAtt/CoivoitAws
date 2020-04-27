var express = require('express');
var fs=require('fs');
var router = express.Router();
var app=require('../app');

/*Exécuté lorsque je suis sur la page rechercher un profil*/
router.get('/', function(req, res, next) {
    if(req.session.Username) {
        app.connection.query('Select * from profils',function(err,result){
            res.render('recherche_profil', {logged: true,profils:result,User:req.session.prenom});
        });
    }
    else {
        req.session.erreur="Vous Devez étre connecté pour acceder a cette fonctionalité";
        res.redirect('./');
    }
});

module.exports = router;

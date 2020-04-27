var express = require('express');
var fs=require('fs');
var router = express.Router();
var app=require('../app');
var NodeGeocoder = require('node-geocoder')


/*Fonction appelée lors de l'inscription*/
function Inscription(prenom, nom, email, mdp,univ,adr){

    var geocoder = NodeGeocoder({
        provider: 'opencage',
        apiKey: '7ba3430907eb4b55aa72623fd71ba90d'
    });

    /*Hachage du mot de passe */
    let crypto = require('crypto')
    const hash = crypto.createHmac('sha256', mdp)
    .update('I love cupcakes')
    .digest('hex');



    /*insertion des données dans la BDD -- nouvelle inscription */
    var data = [email, hash]
    app.connection.query('INSERT INTO accounts SET Username =?, Password=?',data,function(err,result){

    })
    
    /*insertion des données dans la BDD -- MAJ donées personnelles */
    geocoder.geocode(adr,function (err,adrComp) {
        var ville=adrComp[0].city;
        var dataProf= [email,nom, prenom,univ,'default_pic.png',4,ville]
        app.connection.query('INSERT INTO profils SET Username =?,Nom=?,Prenom=?, University=?, Picture=?, Note=?,Adresse=?',dataProf,function(err,result){

        })
    });
}


/* GET home page. */
router.post('/', function(req, res, next) {
    
    /*Je récupère les données du formulaire inscription et je les ajoute dans la BDD si il n'y a pas de pb */
    var email=req.body.EmailReg;
    var name=req.body.NomReg;
    var surname=req.body.PrenomReg;
    var password=req.body.MdpReg;
    var university=req.body.University;
    var adress=req.body.adress;
    Inscription(surname,name,email,password,university,adress);
    sess=req.session;
    sess.erreur='Vous avez été enregistré avec succes';
    res.redirect('.');
});

module.exports = router;

var express = require('express');
var fs=require('fs');
var router = express.Router();
var traitements = require('./traitements.js');

const axios = require('axios');
/* GET home page. */
router.get('/', function(req, res, next) {
    sess=req.session;
    var avis=traitements.getAvis(req.params.user);
    if(sess.Username) {
        res.render('profil',{ logged:true,prenom: sess.prenom,nom: sess.nom,useremail: sess.Username,adresse:'Haja',avis:avis});
    }
    else {
        res.redirect('.');

    }
});

router.get('/:user', function(req, res, next) {
    sess=req.session;
    var profilSuggested=req.params.user;
    traitements.getAvis(profilSuggested, function(err, result) {
        console.log(result);
    });

    var avis=traitements.getAvis(profilSuggested);
    console.log(traitements.getAvis(profilSuggested));
    var profil=traitements.getUserProfil(profilSuggested);

    if(profil.length==0) res.redirect('.');
    else
        res.render('profil',{ logged:true,prenom: profil[0].Prenom,nom: profil[0].Nom,useremail: profilSuggested,adresse:'Haja',avis:avis});

});

function getAvis(userName) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'covoitaws'
    });

    connection.query('Select avis.*,p1.nom as NomEmm,p1.Prenom as PrenomEmm,p2.Nom as NomRec,p2.Prenom as PrenomRec from avis,profils p1,profils p2 where avis.IdRecepteur =? and  avis.IdRecepteur=p2.Username and avis.IdEmmeteur=p1.Username',data,function(err,result){
        return result;
    });


};

module.exports = router;


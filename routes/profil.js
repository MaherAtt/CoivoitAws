var express = require('express');
var fs=require('fs');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    sess=req.session;
    var avis=[{userName: "Maher", message: "Hahahahahahahahahahahahahahahahahah"}, {userName: "Maher", message: "Hahahahahahahahahahahahahahahahahah"}];
    if(sess.Username) {
        res.render('profil',{ logged:true,prenom: sess.prenom,nom: sess.nom,useremail: sess.Username,adresse:'Haja',avis:avis});
    }
    else {
        res.redirect('.');
    }
});

router.post('/', function(req, res, next) {
    sess=req.session;
    var profilSuggested=req.body.userDemand;
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'covoitaws'
    });
    var avis=[];
    connection.query('Select avis.*,p1.nom as NomEmm,p1.Prenom as PrenomEmm,p2.Nom as NomRec,p2.Prenom as PrenomRec from avis,profils p1,profils p2 where avis.IdRecepteur =? and  avis.IdRecepteur=p2.Username and avis.IdEmmeteur=p1.Username',profilSuggested,function(err,result){


         avis=result;



    })



    connection.query('Select * from profils where Username =?',profilSuggested,function(err,result){

        if(result.length==0) res.redirect('.');
        else {
            res.render('profil',{ logged:true,prenom: result[0].Prenom,nom: result[0].Nom,useremail: profilSuggested,adresse:'Haja',avis:avis});
        }
    })

});

module.exports = router;

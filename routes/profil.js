var express = require('express');
var fs=require('fs');
var router = express.Router();
var app=require('../app');

/* GET home page. */
router.get('/', function(req, res, next) {
    sess=req.session;
    var isView;
    if(!req.session.isViewingAvis) isView=false;
    else isView=true;
    if(sess.Username) {
        app.connection.query('Select a.Username as photo,a.Nom as NomEmm,a.Prenom as PrenomEmm from profils a,avis a2 where a2.IdRecepteur=? and a2.IdEmmeteur=a.Username',sess.Username,function(err,avis){
           console.log(avis);
            res.render('profil',{ photo:req.session.Username.split("@")[0]+'.png',canEdit:true,logged:true,prenom: sess.prenom,nom: sess.nom,useremail: sess.Username,adresse:'Adr',avis:avis,isViewingAvis:isView});
        });
    }
    else {
        res.redirect('.');
    }
});

router.get('/:user', function(req, res, next) {
    var sess=req.session;
    if(!sess.Username) res.redirect('../');
    else {
        var profilSuggested = req.params.user;
        var isView;
        if (!req.session.isViewingAvis) isView = false;
        else isView = true;
        var autorisation;
        if (sess.userName == profilSuggested) autorisation = true;
        else autorisation = false;

        var avis;
        app.connection.query('Select a.Username as photo,a.Nom as NomEmm,a.Prenom as PrenomEmm,a2.Commentaire,a2.Note from profils a,avis a2 where a2.IdRecepteur=? and a2.IdEmmeteur=a.Username', profilSuggested, function (err, avis) {
            app.connection.query('Select * from profils where Username =?', profilSuggested, function (err, profil) {
                if (profil.length == 0) res.redirect('../');
                else
                    res.render('profil', {
                        photo:profilSuggested.split("@")[0]+'.png',
                        canEdit: autorisation,
                        logged: true,
                        prenom: profil[0].Prenom,
                        nom: profil[0].Nom,
                        useremail: profilSuggested,
                        adresse: 'Haja',
                        avis: avis,
                        isViewingAvis: isView
                    });
            });
        });

    }


});



module.exports = router;


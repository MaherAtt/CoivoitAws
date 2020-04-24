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
        app.connection.query('Select p.Adresse,a.Username as photo,a.Nom as NomEmm,a.Prenom as PrenomEmm,a2.Commentaire,a2.Note,a2.Confiance,a2.Ponctualite from profils a,avis a2,profils p where a2.IdRecepteur=? and a2.IdEmmeteur=a.Username and p.Username=a2.IdRecepteur',sess.Username,function(err,avis){
            app.connection.query('Select AVG(Ponctualite) as Ponc,AVG(Confiance) as Conf from avis where IdRecepteur =?', sess.Username, function (err, CfPon) {
                res.render('profil', {
                    photo: req.session.Username.split("@")[0] + '.png',
                    canEdit: true,
                    logged: true,
                    prenom: sess.prenom,
                    nom: sess.nom,
                    useremail: sess.Username,
                    adrPers: avis[0].Adresse ,
                    avis: avis,
                    Ponctu:CfPon[0].Ponc*20,
                    Confiance:CfPon[0].Conf*20,
                    isViewingAvis: isView  });

            });
        });
    }
    else {
        req.session.erreur="Vous Devez étre connecté pour acceder a cette fonctionalité";
        res.redirect('.');
    }
});

router.get('/:user', function(req, res, next) {
    var sess=req.session;
    if(!sess.Username) res.redirect('../');
    else {
        var userDat=req.params.user.split("_");

        app.connection.query('Select * from profils where Nom=? and Prenom=?', userDat, function (err, rr) {
            var profilSuggested = rr[0].Username;
        var isView;
        if (!req.session.isViewingAvis) isView = false;
        else isView = true;
        var autorisation;
        if (sess.userName == profilSuggested) autorisation = true;
        else autorisation = false;

        var avis;
        app.connection.query('Select a.Username as photo,a.Nom as NomEmm,a.Prenom as PrenomEmm,a2.Commentaire,a2.Note,a2.Confiance as Confiance,a2.Ponctualite as Ponctualite from profils a,avis a2 where a2.IdRecepteur=? and a2.IdEmmeteur=a.Username', profilSuggested, function (err, avis) {
            app.connection.query('Select * from profils where Username =?', profilSuggested, function (err, profil) {
                app.connection.query('Select AVG(Ponctualite) as Ponc,AVG(Confiance) as Conf from avis where IdRecepteur =?', profilSuggested, function (err, CfPon) {

                    if (profil.length == 0) res.redirect('../');
                else
                    res.render('profil', {
                        photo:profilSuggested.split("@")[0]+'.png',
                        canEdit: autorisation,
                        logged: true,
                        prenom: profil[0].Prenom,
                        nom: profil[0].Nom,
                        useremail: profilSuggested,
                        adrPers: profil[0].Adresse,
                        avis: avis,
                        Ponctu:CfPon[0].Ponc*20,
                        Confiance:CfPon[0].Conf*20,
                        isViewingAvis: isView
                    });
            });
        });
        });
        });

    }


});



module.exports = router;


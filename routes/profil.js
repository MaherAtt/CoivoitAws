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
        app.connection.query('Select * from avis where IdRecepteur=?',sess.Username,function(err,avis){
            res.render('profil',{ logged:true,prenom: sess.prenom,nom: sess.nom,useremail: sess.Username,adresse:'Haja',avis:avis,isViewingAvis:isView});
        });
    }
    else {
        res.redirect('.');
    }
});

router.get('/:user', function(req, res, next) {
    var sess=req.session;
    var isView;
    if(!req.session.isViewingAvis) isView=false;
    else isView=true;
    var profilSuggested=req.params.user;
    var avis;
    app.connection.query('Select * from avis where IdRecepteur=?',profilSuggested,function(err,avis){
        app.connection.query('Select * from profils where Username =?',profilSuggested,function(err,profil){
            if(profil.length==0) res.redirect('../');
            else
                res.render('profil',{ logged:true,prenom: profil[0].Prenom,nom: profil[0].Nom,useremail: profilSuggested,adresse:'Haja',avis:avis,isViewingAvis: isView});
        });
    });






});



module.exports = router;


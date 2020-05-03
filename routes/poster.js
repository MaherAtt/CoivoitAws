var express = require('express');
var fs=require('fs');
var router = express.Router();
var app=require('../app');


/*appelé lorsqu'un utilisateur poste un nouveau trajet*/
router.get('/', function(req, res, next) {
    res.render('proposer',{User:req.session.prenom});
});

/*appelé lorsqu'un utilisateur poste un nouvel avis sur une autre personne*/
router.post('/', function(req, res, next) {
    var user=req.session.nom+" "+req.session.prenom ;
    var message=req.body.commentaire;
    var profOf=req.body.profilOf.replace(" ",'');

    var data=[req.session.Username,profOf,0,req.body.commentaire,req.body.stars, new Date(),req.body.Ponctu,req.body.confiance];
    app.connection.query('INSERT INTO avis SET IdEmmeteur =?,IdRecepteur=?, Sens=?,Commentaire=?, Note=?,DateAvis=?,Ponctualite=?,Confiance=?',data,function(err,result){
        console.log(err);
    })
    sess=req.session;
    sess.isViewingAvis=true;
    
    app.connection.query('SELECT * FROM profils WHERE Username=?',profOf,function(err,result){
        profOf = result[0].Nom+"_"+result[0].Prenom; 
        res.redirect('./Profil/'+profOf);
    })
    //res.redirect('.');
});

module.exports = router;

var express = require('express');
var fs=require('fs');
var router = express.Router();
var app=require('../app');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('proposer');
});

router.post('/', function(req, res, next) {
    var user=req.session.nom+" "+req.session.prenom ;
    var message=req.body.commentaire;
    var profOf=req.body.profilOf.replace(" ",'');


    var data=[req.session.Username,profOf,0,req.body.commentaire,4];
    app.connection.query('INSERT INTO avis SET IdEmmeteur =?,IdRecepteur=?, Sens=?,Commentaire=?, Note=?',data,function(err,result){

    })
    sess=req.session;
    sess.isViewingAvis=true;
    res.redirect('./Profil/'+profOf);
});

module.exports = router;

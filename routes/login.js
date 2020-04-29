var express = require('express');
var fs=require('fs');
var router = express.Router();
var databa=require('../app');
/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('acceuil');
});

/* je me connecte dans mon espace personnel*/
router.post('/', function(req, res, next) {

    
    var email=req.body.emailLog;
    var pass=req.body.passLog;

    var bodyParser=require("body-parser");
    let crypto = require('crypto')
    const hash = crypto.createHmac('sha256', pass)
        .update('I love cupcakes')
        .digest('hex');


    var data = [email, hash]
    databa.connection.query('Select * from accounts,profils where accounts.Username =? and Password=? and accounts.Username=profils.Username',data,function(err,result){

        /*Si les identifiants sont corrects je les places dans une variables globale sess */
        if(result.length==0) res.redirect('.');
        else {
            sess=req.session;
            sess.Username=email;
            sess.prenom=result[0].Prenom;
            sess.nom=result[0].Nom;
            res.redirect('.');
        }
    })

});

module.exports = router;

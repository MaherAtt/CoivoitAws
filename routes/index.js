var express = require('express');
var fs=require('fs');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    
    /*J'affiche la page accueil avec le header correspondant tout dépend du fait que je sois connecté ou pas*/
    var sess= req.session;
    sess.lastError = sess.erreur;
    sess.erreur=undefined;
    if(req.session.Username)
        res.render('acceuil',{logged:true,MessageErr:sess.lastError,User:sess.prenom});
    else
        res.render('acceuil',{logged:false,MessageErr:sess.lastError,User:sess.prenom});

});



module.exports = router;

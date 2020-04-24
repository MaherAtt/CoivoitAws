var express = require('express');
var fs=require('fs');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  var sess= req.session;
  sess.lastError = sess.erreur;
  sess.erreur=undefined;
  if(req.session.Username)
  res.render('acceuil',{logged:true,MessageErr:sess.lastError,User:sess.prenom});
  else
  res.render('acceuil',{logged:false,MessageErr:sess.lastError,User:sess.prenom});

});



module.exports = router;

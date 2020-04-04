var express = require('express');
var fs=require('fs');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  var sess= req.session;
  sess.lastError = sess.erreur;
  sess.erreur=undefined;
  if(req.session.Username)
  res.render('acceuil',{logged:true,error:sess.lastError});
  else
  res.render('acceuil',{logged:false,error:sess.lastError});

});



module.exports = router;

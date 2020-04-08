var express = require('express');
var fs=require('fs');
var router = express.Router();
var app=require('../app');
/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.Username) {

        app.connection.query('Select * from profils',function(err,result){

            res.render('recherche_profil', {logged: true,profils:result});
        });

    }
    else {
        res.redirect('./');
    }
});

module.exports = router;

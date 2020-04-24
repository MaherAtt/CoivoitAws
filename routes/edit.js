var express = require('express');
var fs=require('fs');
var router = express.Router();
var moment = require('moment');
var app=require('../app');
var NodeGeocoder = require('node-geocoder');


/* GET home page. */


router.post('/', function(req, res, next) {

    var geocoder = NodeGeocoder({
        provider: 'opencage',
        apiKey: '7ba3430907eb4b55aa72623fd71ba90d'
    });
    geocoder.geocode(req.body.adress,function (err,adrComp) {
        var ville=adrComp[0].city;
        var dataProf= [ville,req.session.Username]
        app.connection.query('Update profils Set Adresse=? where Username=?',dataProf,function(err,result){
            res.redirect('./profil');
        })
    });

});

module.exports = router;

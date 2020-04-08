var express = require('express');
var fs=require('fs');
var router = express.Router();
var app=require('../app');

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.Username) {
        data = [req.session.Username, req.session.Username];
        app.connection.query('Select t.AdresseDep as AdrDep,t.AdresseArr as AdrArr,t.IdTrajet as IdTrajet,t.DateDep as DateTrajet,d.Message as Message,d.Etat as Etat,t.NbPlaces as NbPlacesDispo,d.IdEmmeteur as Emmeteur,d.IdRecepteur as Recepteur from trajets t,demandes d where t.IdTrajet=d.IdTrajet and d.IdEmmeteur=? or d.IdRecepteur=?', data, function (err, result) {
            res.render('demande', {logged: true, demandes: result, user: req.session.Username});
        });
    }
    else
    {
        res.redirect('./');
    }
});

module.exports = router;

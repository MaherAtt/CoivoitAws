var express = require('express');
var fs=require('fs');
var router = express.Router();
var moment = require('moment');
var app=require('../app');
var NodeGeocoder = require('node-geocoder');

/* Page rechercher un trajet */
router.get('/', function(req, res, next) {
    var isLogged=true;
    if(!req.session.Username) isLogged=false;
    var message;
    res.render('rechercher',{logged:isLogged,trajecto:[],User:'',msg:message});
});

router.post('/', async (req, res) => {

    var geocoder = NodeGeocoder({
        provider: 'opencage',
        apiKey: '7ba3430907eb4b55aa72623fd71ba90d'
    });
    
    /*Enregistrement dans des variables des données situés dans le formulaire de recherche d'un trajet */
    sess=req.session;
    var adrDep=req.body.AdresseDep;
    var adrDest=req.body.AdresseDest;
    var dateDep=req.body.DateDep;
    var heureDep=req.body.HeureDep;
    dateDep=dateDep+' '+heureDep;

    //console.log(adrDep);


    if(sess.Username) {

        /* Je recherche un trajet */
        geocoder.geocode(adrDep,( err, userDep ) => {
            geocoder.geocode(adrDest,( err, userDest ) => {
                app.connection.query('Select t.*,p.Nom as NomChauffeur,p.Prenom as PrenomChauffeur,p.Note as Note from trajets t,profils p where t.IdChauffeur=p.Username',( err, result ) => {
                    
                    if(typeof result === 'undefined' || result.length==0) {
                        res.render('rechercher',{logged:isLogged,trajecto:[],user:'',msg:"Désolé aucun trajet ne correspond à votre recherche"});
                    }
                    else {
                        var tabResultat = [];
                        for (i = 0; i < result.length; i++) {
                            var distanceDest = getDistance(userDest[0].latitude, userDest[0].longitude, result[i].latitudeArr, result[i].longitudeArr);
                            var distanceTrajet = getDistance(result[i].latitudeArr, result[i].longitudeArr, result[i].latitudeDep, result[i].longitudeDep);
                            var distanceDep = getDistance(result[i].latitudeDep, result[i].longitudeDep, userDep[0].latitude, userDep[0].longitude);
                            var dureeTrajet = distanceTrajet / 20;
                            var dureeRejoindreDep = distanceDep / 2;
                            moment.locale('fr');
                            var dateStr = moment(result[i].DateDep, 'DD MMM YYYY HH:mm');
                            dateStr.add(dureeTrajet + dureeRejoindreDep, 'h');
                            var dateStr2 = moment(dateDep, 'DD MMM YYYY HH:mm');
                            var Jour1 = dateStr.format('DD MMM YYYY');
                            var Jour2 = dateStr2.format('DD MMM YYYY');

                            if (distanceDest < 2 && dateStr.isBefore(dateStr2) && Jour1 == Jour2) {
                                if(result[i].NbPlaces > 0) tabResultat.push(result[i]);
                            }
                        }
                        if(tabResultat.length==0) {   res.render('rechercher',{logged:true,trajecto:[],User:'',msg:"Aucun trajet ne correspond a votre recherche"});
                        }
                        else res.render('rechercher', {logged: true, trajecto: tabResultat, user: sess.Username,User:''});
                    }
                });
            });
        });
    }
    else {
        res.redirect('.');
    }
});

module.exports = router;

/* Calcul de la distance entre un point de départ et un point d'arrivé*/
function getDistance(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI/180)
}


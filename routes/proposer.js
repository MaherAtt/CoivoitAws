var express = require('express');
var fs=require('fs');
var router = express.Router();
var moment = require('moment');
var app=require('../app');
var NodeGeocoder = require('node-geocoder');


/* Page proposer un nouveau trajet */
router.get('/', function(req, res, next) {
    if(req.session.Username)
        res.render('proposer',{logged:true,User:req.session.prenom,err:req.session.erreur});
    else {
        req.session.erreur="Vous devez être connecté pour accéder à cette fonctionalité";
        res.redirect('./');
    }
});

router.post('/', function(req, res, next) {
    /* je récupère ces informaions du formalaire rempli pour l'ajout d'un nouveau trajet*/
    var adrDep=req.body.adrDepart;
    var adrDest=(req.body.adrDestination);
    var dateDep=req.body.dateDep;
    var heureDep=req.body.heureDep;
    var prix=req.body.prix;
    var details=req.body.commentaire;
    adrDepFinal=adrDep.replace("'"," ");
    adrDestFinal=adrDest.replace("'"," ");
    dateDep=dateDep+' '+heureDep;
    console.log(dateDep);
    moment.locale('fr');
    var geocoder = NodeGeocoder({
        provider: 'opencage',
        apiKey: '7ba3430907eb4b55aa72623fd71ba90d'
    });

    var dateStr = moment(dateDep, 'DD MMM YYYY HH:mm').format('YYYY-MM-DD HH:mm:ss');


    /* Ajout d'un nouveau trajet dans la BDD*/
    geocoder.geocode(adrDep,function (err,resDep) {
        geocoder.geocode(adrDest,function (err,resDes) {
            var distanceTrajet=getDistance(resDep[0].latitude,resDep[0].longitude,resDes[0].latitude,resDes[0].longitude);
            var dureeTrajet=distanceTrajet/10;
            var dateStr2= moment(dateDep, 'DD MMM YYYY HH:mm').add(dureeTrajet,'h').format('YYYY-MM-DD HH:mm:ss');
            var data=['NULL',req.session.Username,adrDepFinal,adrDestFinal,dateStr,dateStr2,4,prix,resDep[0].latitude,resDep[0].longitude,resDes[0].latitude,resDes[0].longitude,details];
            app.connection.query('INSERT INTO trajets SET IdTrajet=?, IdChauffeur =?,AdresseDep=?, AdresseArr=?,DateDep=?,DateArr=?, NbPlaces=?, Prix=?, latitudeDep=?, longitudeDep=?, latitudeArr=?, longitudeArr=?,Commentaire=?',data,function(err,result){
                if( typeof result === 'undefined')
                {
                    req.session.erreur="L'ajout du trajet a échoué veuillez réessayer";
                    res.redirect('./proposer');
                } else {
                    req.session.erreur="Votre trajet a été ajouté vous pouvez dès à présent commencer à gérer les demandes";
                    res.redirect('./proposer');
                }

            })
        })
    })

});

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

module.exports = router;

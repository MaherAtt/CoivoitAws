var express = require('express');
var fs=require('fs');
var router = express.Router();
var app=require('../app');
var users=[];

/*Messagerie*/
router.get('/', function(req, res, next) {

    if(req.session.Username) {
        data = [req.session.Username, req.session.Username];
        
        /***********************************************/
        app.connection.query('Select P1.Username as Id,P1.Nom,P1.Prenom from Messages,Profils P1 where  (IdEmmeteur=P1.Username and IdRecepteur=?) UNION Select P2.Username as Id,P2.Nom,P2.Prenom as Id from Profils P2,Messages where  (IdRecepteur=P2.Username and IdEmmeteur=?)  ', data, function (err, result) {

            res.render('messagerie', {logged:true,user: req.session.Username, users: result,User:req.session.prenom});

        })

        /*Je me connecte à la messagerie */
        res.io.once('connection', function (client) {
            var found=false;
            for(i=0;i<users.length;i++){
                if(users[i].userName==req.session.Username){
                    found=true;
                }
            }
            if(found==false) {
            users.push({
                id : client.id,
                userName : req.session.Username
            });}
            /*  Renvoie le contenu de la conversation contenue dans la BDD si tout se passe bien*/
            client.on('afficher conversation', function (datak) {

                try {
                 data = [req.session.Username, datak, datak, req.session.Username];
                    app.connection.query('Select * from Messages where (IdEmmeteur=? and IdRecepteur=?) or (IdEmmeteur=? and IdRecepteur=?) ', data, function (err, result) {

                        client.emit('last message', result);
                    })


                } catch (err) {
                    client.emit('error message', "Problème lors de l'ouverture de la conversation ");
                    return;
                }
            });


            /* Lit le message l'affiche et le sauvegarde dans la BDD */
            client.on('actu message', function (data) {
                var dest;
                var emm;
                for(i=0;i<users.length;i++){
                    if(users[i].userName==data.Destinataire){
                        dest=users[i].id;
                    }
                }
                client.to(dest).emit('new message', data);

                data = [req.session.Username, data.Destinataire, data.Message, 'GETDATE();'];
                app.connection.query('Insert into messages set IdEmmeteur=?,IdRecepteur=?,Message=?,DateMsg=? ', data, function (err, result) {

                })
            });


            /*sauvegarde d'un message dans un fichier json*/


            /*Déconnecte le client*/
            client.on('disconnect', function () {
                delete client;
            });

        });
    }
    else
    {
        req.session.erreur="Vous devez être connecté pour accéder à cette fonctionalité";
        res.redirect('./');
    }
});

module.exports = router;

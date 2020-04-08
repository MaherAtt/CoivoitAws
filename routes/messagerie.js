var express = require('express');
var fs=require('fs');
var router = express.Router();
var app=require('../app');
router.get('/', function(req, res, next) {

    if(req.session.Username) {
        data = [req.session.Username, req.session.Username];
        app.connection.query('Select IdEmmeteur as Id from Messages where  IdRecepteur=? UNION Select IdRecepteur as Id from Messages where  IdEmmeteur=? ', data, function (err, result) {

            res.render('messagerie', {logged:true,user: req.session.Username, users: result});

        })


        res.io.on('connection', function (client) {

            /* Lit fichier .jon contenant une conversation. Renvoie le contenu si tout se passe bien*/
            client.on('afficher conversation', function (datak) {

                try {
                    data = [req.session.Username, datak, datak, req.session.Username];
                    app.connection.query('Select * from Messages where (IdEmmeteur=? and IdRecepteur=?) or (IdEmmeteur=? and IdRecepteur=?) ', data, function (err, result) {

                        client.emit('last message', result);
                    })


                } catch (err) {
                    client.emit('error message', "Problème lors de l'ouverture du fichier");
                    return;
                }
            });


            /* Lit le message l'affiche et le sauvegarde dans un fichier json */
            client.on('new message', function (data) {

                res.io.emit('new message', data);
                data = [data.Emmeteur, data.Destinataire, data.Message, 'GETDATE();'];
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
        res.redirect('./');
    }
});

module.exports = router;

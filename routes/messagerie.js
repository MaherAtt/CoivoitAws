var express = require('express');
var fs=require('fs');
var router = express.Router();

router.get('/', function(req, res, next) {

    res.render('messagerie');

    let lastMessage = new Array();
   
    res.io.on('connection', function(client){

        /* Lit fichier .jon contenant une conversation. Renvoie le contenu si tout se passe bien*/
        client.on('afficher conversation', function(data){
            let fichier;
            let contenu_conversation ;
            try {
                fichier = fs.readFileSync(data);
                contenu_conversation = JSON.parse(fichier)
                client.emit('last message', contenu_conversation);

            } catch(err) {
                client.emit('error message', "Problème lors de l'ouverture du fichier");
                return;
            }
        });


        /* Lit le message l'affiche et le sauvegarde dans un fichier json */
        client.on('new message', function(data){
            // Vérification du pseudonyme
            if(!data.username || typeof data.username == undefined || data.username.length > 25){
                client.emit('error message', "Le pseudonyme rentré n'est pas valide !");
                return;
            }

            // Vérification du message
            if(!data.message || typeof data.message == undefined || data.message.length > 255){
                client.emit('error message', "Le message rentré n'est pas valide !");
                return;
            }
            lastMessage.push(data.username + ' : ' + data.message);
            for(var i = lastMessage.length-1; i--;){
                if(i == 5){
                    lastMessage.shift();
                }
            }
            res.io.emit('new message', data);
            saveInFile(data);
        });


        /*sauvegarde d'un message dans un fichier json*/
        function saveInFile(data){
            let msg = {
                id : data.username,
                message : data.message,
                date : data.date
            };

            var obj = JSON.parse( fs.readFileSync(data.file)); 
            obj.table.push(msg); 
            json = JSON.stringify(obj);
            fs.writeFile(data.file, json, err => {});
        };


        /*Déconnecte le client*/
        client.on('disconnect', function(){
            delete client;
        });

    });
});

module.exports = router;

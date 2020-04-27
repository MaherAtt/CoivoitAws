var dbconnect = function(callback) {
    /*Connexion à la BDD en ligne*/
    var mysql = require('mysql');
    var db_config = {
        host     : 'us-cdbr-iron-east-01.cleardb.net',
        user     : 'b68f308ddca3d1',
        password : '754810b0',
        database : 'heroku_d1dd061e72cfd25'
    };
    var connection;
    handleDisconnect();

    return callback(null,connection);
};
exports.dbconnect = dbconnect;

/*Affiche les avis laissés par les utilisateurs*/
var getAvis = function(data, callback) {
    var mysql = require('mysql');
    var connection;


    dbconnect(function (err,result) {
        console.log(result);
    })

    var a;
    connection.query('Select * from accounts',data,function(err,result){
        console.log(result);
    });
   /* connection.query('Select avis.*,p1.nom as NomEmm,p1.Prenom as PrenomEmm,p2.Nom as NomRec,p2.Prenom as PrenomRec from avis,profils p1,profils p2 where avis.IdRecepteur =? and  avis.IdRecepteur=p2.Username and avis.IdEmmeteur=p1.Username',data,function(err,result){
        a=result;
    });*/

    callback(null,a);
};
exports.getAvis = getAvis;

module.exports.hello = function() {

}


/*info personnelles de l'utilisateur connecté*/
module.exports.getUserProfil= function(userName) {
    var connection=dbconnect();
    connection.query('Select * from profils where Username =?',userName,function(err,result){
        return result;
    });
};

function handleDisconnect() {
    connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                    // the old one cannot be reused.
    connection.connect(function(err) {              // The server is either down
        if(err) {                                     // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 20000); // We introduce a delay before attempting to reconnect,
        }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
                                            // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}
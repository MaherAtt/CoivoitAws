var dbconnect = function(data, callback) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'covoitaws'
    });

    callback(null,connection);
};
exports.dbconnect = dbconnect;

var getAvis = function(data, callback) {
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host     : 'us-cdbr-iron-east-01.cleardb.net',
        user     : 'b68f308ddca3d1',
        password : '754810b0',
        database : 'heroku_d1dd061e72cfd25'
    });
    connection.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
    var a;
    connection.query('Select avis.*,p1.nom as NomEmm,p1.Prenom as PrenomEmm,p2.Nom as NomRec,p2.Prenom as PrenomRec from avis,profils p1,profils p2 where avis.IdRecepteur =? and  avis.IdRecepteur=p2.Username and avis.IdEmmeteur=p1.Username',data,function(err,result){
        a=result;
    });

    callback(null,a);
};
exports.getAvis = getAvis;

module.exports.hello = function() {

}



module.exports.getUserProfil= function(userName) {
    var connection=dbconnect();
    connection.query('Select * from profils where Username =?',userName,function(err,result){
        return result;
    });
};


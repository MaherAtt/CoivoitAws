var express = require('express');
var fs=require('fs');
var router = express.Router();
var app=require('../app');

/* GET home page. */
router.get('/:user', function(req, res, next) {

    data = [req.session.Username, req.params.user, ' ', 'GETDATE();'];
    data2 = [req.session.Username, req.params.user,req.params.user,req.session.Username];
    app.connection.query('Select * from messages where (IdEmmeteur=? and IdRecepteur=?) or (IdEmmeteur=? and IdRecepteur=?)',data2,function(err,result){
        if(result.length==0)
        {
        app.connection.query('Insert into messages set IdEmmeteur=?,IdRecepteur=?,Message=?,DateMsg=?',data,function(err,result2){
            res.redirect('../messagerie');
        });}
        else
        {
            res.redirect('../messagerie');
        }
    });



});

module.exports = router;

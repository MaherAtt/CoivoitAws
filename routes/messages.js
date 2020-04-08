var express = require('express');
var router = express.Router();
var app=require('../app');

/* GET users listing. */
router.get('/', function(req, res, next) {
    data=[req.session.Username,req.session.Username];
    app.connection.query('Select * from Messages where IdEmmeteur=? or IdRecepteur=?',data,function(err,result){
            res.send(result);
    })
});

router.post('/', function(req, res, next) {

    data=[req.session.Username,req.body.Destinataire,req.body.Msg,'GETDATE();'];
    app.connection.query('Insert into messages set IdEmmeteur=?,IdRecepteur=?,Message=?,DateMsg=? ',data,function(err,result){
        res.io.emit('message', req.body);
    })

});

module.exports = router;

var express = require('express');
var fs=require('fs');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {

    /*Je me déconnecte de mon espace personnel */
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('.');
    });
});

module.exports = router;

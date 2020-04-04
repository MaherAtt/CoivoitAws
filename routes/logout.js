var express = require('express');
var fs=require('fs');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {

    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('.');
    });
});

module.exports = router;

var express = require('express');
var fs=require('fs');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('proposer');
});

module.exports = router;

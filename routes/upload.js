var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var multer = require('multer');

/* GET users listing. */
router.post('/', function(req, res, next) {

    /*MAJ photo de profil */
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/Pictures')
        },
        filename: function (req, file, cb) {
            var extension = file.originalname.split('.').pop();
            cb(null, req.session.Username.split("@")[0]+'.'+extension);
        }
    });

    var upload = multer({ storage: storage }).single('PictureFile');


    upload(req, res, function(err) {

        if (err) {
            console.log(err);
           res.redirect('./');
        }
        res.redirect('./Profil');
    });


});

module.exports = router;

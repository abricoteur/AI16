var express = require('express');
var router = express.Router();
var userModel = require('../model/profil.js')

router.get('/', function (req, res, next) {
    result=userModel.readall(function(result){
        res.render('profil', { title: 'Page admin', profil: result});
    });
});

module.exports = router;
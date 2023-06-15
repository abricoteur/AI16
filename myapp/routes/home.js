var express = require('express');
var router = express.Router();
var userModel = require('../model/users.js')

router.get('/', function (req, res, next) {
    result=userModel.readall(function(result){
        res.render('home', { title: 'Page accueil', home: result});
    });
});

module.exports = router;
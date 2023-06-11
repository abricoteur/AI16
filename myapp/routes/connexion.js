var express = require('express');
var router = express.Router();
var userModel = require('../model/users.js')

router.get('/', function (req, res, next) {
    result=userModel.readall(function(result){
        res.render('connexion', { title: 'Page de connexion', connexion: result});
    });
});

module.exports = router;
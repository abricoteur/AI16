var express = require('express');
var router = express.Router();
var userModel = require('../model/user_management.js')

router.get('/', function (req, res, next) {
    result=userModel.readall(function(result){
        res.render('user_management', { title: 'Page admin', user_management: result});
    });
});

module.exports = router;
var express = require('express');
var router = express.Router();
var userModel = require('../model/application_management.js')

router.get('/', function (req, res, next) {
    result=userModel.readall(function(result){
        res.render('application_management', { title: 'Page application', application_mangement: result});
    });
});

module.exports = router;
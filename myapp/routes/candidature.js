var express = require('express');
var router = express.Router();
var candidaturesModel = require('../model/candidatures.js')

router.get('/', function (req, res, next) {
    email = req.session.user.email;
    result=candidaturesModel.read(email, function(result){
        console.log(result)
        res.render('candidature', { candidatures: result});
    });
});

module.exports = router;
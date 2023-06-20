var express = require('express');
var router = express.Router();
var userModel = require('../model/users.js')

router.get('/', function (req, res, next) {
    result=userModel.read(req.session.user.email,function(result){
        res.render('profil', { title: 'Page Profil Candidat', profil: result});
    });
});

module.exports = router;
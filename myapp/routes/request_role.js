var express = require('express');
var router = express.Router();
var request_roleModel = require('../model/request_role.js')

router.get('/', function (req, res, next) {
    res.render('organization_form');
});

router.post('/admin', function (req, res, next) {
    var email = req.session.user.email;

    request_roleModel.request_admin(email, function (result) {
        res.redirect('/profil');
    });
});

router.post('/recruteur', function (req, res, next) {
    var siren = req.body.siren;
    var email = req.session.user.email;

    request_roleModel.request_recruteur(email,siren, function (result) {
        res.redirect('/profil');
    });
});

router.get('/acceptAdmin', function (req, res, next) {
    var email = req.query.email;

    request_roleModel.acceptAdmin(email, function(){
        res.redirect('/admin');
    })
})

router.get('/acceptRecruiter', function (req, res, next) {
    var email = req.query.email;

    request_roleModel.acceptRecruiter(req.session.user.siren,email, function(){
        
    })
})

router.get('/refuseAdmin', function (req, res, next) {
    var email = req.query.email;

    request_roleModel.refuseAdmin(email, function(){
        res.redirect('/admin');
    })
})

router.get('/refuseRecruiter', function (req, res, next) {
    var email = req.query.email;

    request_roleModel.refuseRecruiter(req.session.user.siren, email, function(){
        
    })
})

module.exports = router;
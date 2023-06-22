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

router.post('/acceptAdmin', function (req, res, next) {
    var data = req.body;

    request_roleModel.acceptAdmin(data.requester_email, function(){
        
    })
})

router.post('/acceptRecruiter', function (req, res, next) {
    var data = req.body;

    request_roleModel.acceptRecruiter(data.siren, data.requester_email, function(){
        
    })
})

router.post('/refuseAdmin', function (req, res, next) {
    var data = req.body;

    request_roleModel.refuseAdmin(data.requester_email, function(){
        
    })
})

router.post('/refuseRecruiter', function (req, res, next) {
    var data = req.body;

    request_roleModel.refuseRecruiter(data.siren, data.requester_email, function(){
        
    })
})

module.exports = router;
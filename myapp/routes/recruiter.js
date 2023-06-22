var express = require('express');
var router = express.Router();
var requestsModel = require('../model/request_role.js')

router.get('/', function (req, res, next) {
    var siren = req.session.user.siren;
    result=requestsModel.readRecruiter(siren, function(result){
        res.render('recruiter', {demandes: result});
    });
});

router.post('/refuse', function (req, res, next) {
    requestsModel.refuseRecruiter(req.session.user.siren,req.body.email, function (result) {
        res.redirect('/recruiter');
    });
});

router.post('/accept', function (req, res, next) {
    requestsModel.acceptRecruiter(req.session.user.siren,req.body.email, function (result) {
        res.redirect('/recruiter');
    });
});

module.exports = router;
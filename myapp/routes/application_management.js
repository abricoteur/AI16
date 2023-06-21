var express = require('express');
var router = express.Router();
var candidaturesModel = require('../model/candidatures.js')

router.get('/', function (req, res, next) {
    candidaturesModel.readOrganisationCandidatures(req.session.user.siren, function(result){
        res.render('application_management', { title: 'Page application', candidatures: result});
    });
});

module.exports = router;
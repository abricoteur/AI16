var express = require('express');
var router = express.Router();
var requestsCreateOrganisationModel = require('../model/requestsCreateOrganisation.js')

router.get('/', function (req, res, next) {
    res.render('organization_form');
});

router.post('/request', function (req, res, next) {
    var data = req.body; // Access the POST data sent from the client
    var email = req.session.user.email;
    console.log(req.session.user)

    result = requestsCreateOrganisationModel.create(email, data.siren, data.siege_social, data.domaine, data.nom, function (result) {

        res.redirect('/home');
    });
});

module.exports = router;
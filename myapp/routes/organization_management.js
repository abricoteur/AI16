var express = require('express');
var router = express.Router();
var organisationsModel = require('../model/organisations.js')

router.get('/', function (req, res, next) {
    organisationsModel.readAllInformations(function (organisations) {
        res.render('organization_management', {
            title: 'Page Admin Organization Management',
            organisations: organisations
        });
    });
});


router.post('/delete', function (req, res, next) {
    var data = req.body; // Access the POST data sent from the client
    organisationsModel.delete(data.siren, function (result) {


    });
    organisationsModel.readAllInformations(function (organisations) {
        res.render('organization_management', {
            title: 'Page Admin Organization Management',
            organisations: organisations
        });
    });
});

router.get('/update', function (req, res, next) {
    var data = req.body; // Access the POST data sent from the client
    result = organisationsModel.update(data.siren, data.nom, data.domaine, data.ceo, data.description, data.adress, data.siege_social, function (result) {
        res.render('organization_management_update_confirmation', { title: 'Page Admin Organization Update Confirmation', result: result });
    });
});


module.exports = router;
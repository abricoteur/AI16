var express = require('express');
var router = express.Router();
var organisationsModel = require('../model/organisations.js')

router.get('/', function (req, res, next) {
    elementsPerPage = 3;
    pageNumber = req.query.page;
    if (pageNumber === undefined) {
        pageNumber = 1;
    }
    organisationsModel.readAllInformations(elementsPerPage, pageNumber, function (organisations) {
        organisationsModel.count(function (count) {
            const totalPages = Math.ceil(count / elementsPerPage);
            res.render('organization_management', {
                title: 'Page Admin Organization Management',
                organisations: organisations, totalPages, pageNumber
            });
        });
    });
});


router.post('/delete', function (req, res, next) {
    var data = req.body; // Access the POST data sent from the client
    organisationsModel.delete(data.siren, function (result) {
        res.redirect('/organization_management?page=1');
    });
});

router.post('/update', function (req, res, next) {
    var data = req.body; // Access the POST data sent from the client
    organisationsModel.update(data.siren, data.nom, data.siege_social, function (result) {
        res.redirect('/organization_management?page=1');
    });
});


module.exports = router;
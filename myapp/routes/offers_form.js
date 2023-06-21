var express = require('express');
var router = express.Router();
var offersModel = require('../model/offres.js')

router.get('/', function (req, res, next) {
    result=offersModel.read(function(result){
        res.render('offers_form', { title: 'Page Offre', offers_form: result});
    });
});

router.post('/request', function (req, res, next) {
    var data = req.body; // Access the POST data sent from the client
    var email = req.session.user.email;

    result = offersModel.create(data.nom, data.status, data.responsable, data.domaine, data.lieu, data.rythme, data.salaire, data.description, data.date, data.siren, data.entreprise, function (result) {

        res.redirect('/recruiter');
    });
});
module.exports = router;
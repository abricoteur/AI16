var express = require('express');
var router = express.Router();
var offersModel = require('../model/offres.js')

router.get('/', function (req, res, next) {
        res.render('offers_form');
});

router.post('/request', function (req, res, next) {
    var data = req.body; // Access the POST data sent from the client
    var email = req.session.user.email;
    var siren = req.session.user.siren;
    if (data.nom === "" || email === "" || data.domaine === "" || data.lieu === "" || data.rythme === "" || data.salaire === "" || data.description === "" || siren === "") {
        return res.redirect('/offers_form');
    }

    offersModel.create(data.nom, email, data.domaine, data.lieu, data.rythme, data.salaire, data.description, siren, function (result) {
        res.redirect('/recruiter');
    });
});

module.exports = router;
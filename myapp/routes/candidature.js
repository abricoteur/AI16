var express = require('express');
var router = express.Router();
var candidaturesModel = require('../model/candidatures.js')

router.get('/', function (req, res, next) {
    email = req.session.user.email;
    result = candidaturesModel.read(email, function (result) {
        res.render('candidature', { candidatures: result });
    });
});

router.post('/postuler', function (req, res, next) {
    email = req.session.user.email;
    id_offre = req.body.id_offre;
    siren = req.body.siren;
    message = req.body.message;
    result = candidaturesModel.create(email, id_offre, siren, message, function (result) {
        res.redirect('/candidature');

    });
});

module.exports = router;
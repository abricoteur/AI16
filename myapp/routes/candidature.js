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

router.get('/delete', function (req, res, next) {
    const id = req.query.candidature_id;
    const user_email = req.session.user.email;

    candidaturesModel.delete(id, user_email)
        .then(() => {
            res.send('<script>window.location.href="/candidature";</script>')
        })
        .catch(err => {
            console.log(err);
            // Handle error appropriately, possibly send a response to client
        });
});




module.exports = router;
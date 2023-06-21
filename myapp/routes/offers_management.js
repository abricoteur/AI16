var express = require('express');
var router = express.Router();
var offresModel = require('../model/offres.js')

router.get('/', function (req, res, next) {
    offresModel.offresFromOrga(req.session.user.siren,function(result){
        res.render('offers_management', { title: 'Gérer les offres', offers: result});
    });
});

module.exports = router;
var express = require('express');
var router = express.Router();
var offresModel = require('../model/offres.js')

router.get('/', function (req, res, next) {
    var data = req.query;
        result=offresModel.read(req.session.user.email,data.id_offre, function(result){
        res.render('offers_details', { title: 'Page application', offer_details: result});
    });
});

module.exports = router;
var express = require('express');
var router = express.Router();
var offresModel = require('../model/offres.js')

router.get('/', function (req, res, next) {
    var data = req.query;
    result=offresModel.read(data.offer_id, function(result){
        console.log(result)
        res.render('offers_details', { title: 'Page application', offer_details: result});
    });
});

module.exports = router;
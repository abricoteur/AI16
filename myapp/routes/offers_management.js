var express = require('express');
var router = express.Router();
var offersModel = require('../model/offres.js')

router.get('/', function (req, res, next) {
    offersModel.offresFromOrga(req.session.user.siren,function(result){
        res.render('offers_management', { title: 'Gérer les offres', offers: result});
    });
});


router.post('/update', function (req, res, next) {
    console.log("route");
    var data = req.body;
    offersModel.updateOffers(data.entreprise, data.responsable, data.lieu, data.domaine, data.salaire ,data.description, data.id, function(){
    })
})

router.post('/delete', function (req, res, next) {
    var data = req.body; // Access the POST data sent from the client
    offersModel.deleteOffers(data.id, function (result) {
        res.redirect('/offers_management');
    });
});

module.exports = router;
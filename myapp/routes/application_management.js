var express = require('express');
var router = express.Router();
var candidaturesModel = require('../model/candidatures.js');
var offresModel = require('../model/offres.js');

router.get('/', function (req, res, next) {
    var offer = req.query.offer;
    offresModel.offresFromOrga(req.session.user.siren, function (offres) {
      candidaturesModel.readOrganisationCandidatures(req.session.user.siren, function (result) {
        var filteredResult;
        if (offer == undefined) {
          filteredResult = result;
        } else {
          filteredResult = result.filter(function (item) {
            return item.id == offer;
          });
        }
        res.render('application_management', { title: 'Page application', offres :offres,  candidatures: filteredResult });
      });
    });
  });
  

module.exports = router;
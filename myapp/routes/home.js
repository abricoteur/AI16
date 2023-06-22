var express = require('express');
var router = express.Router();
var offres = require('../model/offres.js')

router.get('/', function (req, res, next) {

    // filtres
    const filtre_domaine = req.query.domaine;
    const filtre_salaire = req.query.salaire;

    const filtre_lieu = req.query.ou;
    const filtre_all = req.query.quoi;

    if(filtre_all != undefined || filtre_lieu != undefined || filtre_domaine != undefined || filtre_salaire != undefined){
        result=offres.readFilter(filtre_all,filtre_domaine,filtre_salaire,filtre_lieu, function(result){
            res.render('home', { title: 'Page accueil', offres: result});
        });
    }
    else {
        result=offres.readAll(function(result){
            console.log(result)
            res.render('home', { title: 'Page accueil', offres: result});
        });
    }
});

module.exports = router;
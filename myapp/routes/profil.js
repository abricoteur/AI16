var express = require('express');
var router = express.Router();
var userModel = require('../model/users.js')
var piecesModel = require('../model/pieces.js')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Les fichiers seront sauvegardés dans le dossier 'uploads'


router.get('/', function(req, res, next) {
    result = userModel.read(req.session.user.email, function(result) {
        result2 = piecesModel.read(req.session.user.email, function(result2) {
            console.log(result2);
            res.render('profil', { title: 'Page Profil Candidat', profil: result, file: result2[0] }); // Assuming you only want to pass the first file if available
        });
    });
});


router.post('/update', upload.single('myFile'), function (req, res) {
    const fs = require('fs');
    const file = req.file;
    const userProfile = {
        nom: req.body.nom,
        prenom: req.body.prenom,
        tel: req.body.tel,
        email: req.session.user.email,
    };

    result = userModel.update(userProfile.email, userProfile.nom, userProfile.prenom, userProfile.tel, function (result) {
        result2 = piecesModel.upload(userProfile.email, file, function (result2) {
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log('Fichier supprimé avec succès');
            });
            res.redirect('/profil');
        });
    });


});




module.exports = router;
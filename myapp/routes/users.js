var express = require('express');
var router = express.Router();
var userModel = require('../model/users.js')
const bcrypt = require('bcrypt');
const userModel = require('../model/user.js');
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/userslist', function (req, res, next) {
    result=userModel.readall(function(result){
        res.render('usersList', { title: 'List des utilisateurs', users: result });
    });
});

router.get('/nvUser', function (req, res, next) {
    var data = req.body; // Access the POST data sent from the client
    // Generate a salt to be used for password hashing
    bcrypt.genSalt(10, function (err, salt) {
        if (err) throw err;

        // Hash the password
        bcrypt.hash(data.pwd, salt, function (err, hashedPassword) {
            if (err) throw err;

            // Create the user with the hashed password
            result = userModel.create(data.email, data.nom, data.prenom, hashedPassword, data.tel, data.status, data.role, function (result) {
                res.render('nvUser', { title: 'Nouveau utilisateur', result: result });
            });
        });
    });
});

router.get('/checkUser', function (req, res, next) {
    var data = req.body; // Access the POST data sent from the client

    result=userModel.read(data.email, function(user){
        const hashedPassword = user.mdp;

        const providedPassword = data.mdp;

        bcrypt.compare(providedPassword, hashedPassword, function (err, result) {
            if (err) throw err;
        
            if (result) {
                res.render('offers_form', { title: 'Page Accueil Utilisateur', offers_form: result})
            } else {
                res.render('connexion', { title: 'Page Accueil Utilisateur', login: result})
            }
        });
    });
});





module.exports = router;
var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const userModel = require('../model/users.js');
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/userslist', function (req, res, next) {
    result = userModel.readall(function (result) {
        res.render('usersList', { title: 'List des utilisateurs', users: result });
    });
});

router.get('/connexion', function (req, res, next) {
    res.render('connexion', { title: 'Page Connexion Utilisateur' });
});

router.get('/register', function (req, res, next) {
    res.render('createUser', { title: 'Page Candidat Inscription' });
});

router.post('/nvUser', function (req, res, next) {
    var data = req.body; // Access the POST data sent from the client
    // Generate a salt to be used for password hashing
    bcrypt.genSalt(10, function (err, salt) {
        if (err) throw err;

        // Hash the password
        bcrypt.hash(data.mdp, salt, function (err, hashedPassword) {
            if (err) throw err;

            // Create the user with the hashed password
            result = userModel.create(data.email, data.nom, data.prenom, hashedPassword, data.tel, data.role, function (result) {
                user = userModel.read(data.email, function (data_user) {
                    const user = data_user[0];

                    bcrypt.compare(hashedPassword, user.mdp, function (err, result) {
                        if (err) throw err;

                        res.render('connexion', { title: 'Page Connexion Utilisateur', result: result })

                    });
                });
            });
        });
    });
});

router.post('/checkUser', function (req, res, next) {
    var data = req.body; // Access the POST data sent from the client

    result = userModel.read(data.email, function (data_user) {
        const user = data_user[0];

        if (!user) {
            // User not found
            return res.render('connexion', { title: 'Page Connexion Utilisateur', result: false });
          }

        const hashedPassword = user.mdp;

        const providedPassword = data.mdp;

        bcrypt.compare(providedPassword, hashedPassword, function (err, passwordMatch) {
            if (err) throw err;

            if (passwordMatch) {
                    req.session.user = {
                        mail: user.email,
                        role: user.role
                    };
                    console.log(req.session)
                

                return res.render('home', { title: 'Page Accueil Utilisateur', result: result })
            } else {
                return res.render('connexion', { title: 'Page Connexion Utilisateur', result: result })
            }
        });
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});





module.exports = router;
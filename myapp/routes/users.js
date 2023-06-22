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
    const error = req.session.error;
    req.session.error = null;
    res.render('createUser', { title: 'Page Candidat Inscription', error: error });
});

router.post('/nvUser', function (req, res, next) {
    var data = req.body; // Access the POST data sent from the client

    function isValidPassword(password) {
        // Au moins 12 caractères
        if (password.length < 12) return false;

        // Doit contenir une majuscule
        if (!/[A-Z]/.test(password)) return false;

        // Doit contenir une minuscule
        if (!/[a-z]/.test(password)) return false;

        // Doit contenir un chiffre
        if (!/[0-9]/.test(password)) return false;

        // Doit contenir un caractère spécial
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false;

        return true;
    }

    if (!isValidPassword(data.mdp)) {
        req.session.error = 'Mot de passe invalide';
        return res.redirect('/users/register');
    }

    function isValidEmail(email) {
        const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        return regex.test(email);
    }

    if (!isValidEmail(data.email)) {
        req.session.error = 'Adresse Email invalide';
        return res.redirect('/users/register');
    }

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
            return res.redirect('/users/connexion');
        }

        const hashedPassword = user.mdp;

        const providedPassword = data.mdp;

        req.session.user = {
            email: user.email,
            role: user.role,
            siren: user.id_orga
        };

        if(user.role=='Administrateur'){
            return res.redirect('/admin');
        }
        else if(user.role=='Candidat')
        {
            return res.redirect('/home');
        }
        else if(user.role=='Recruteur')
        {
            return res.redirect('/recruiter');
        }   
        else {
            return res.redirect('/users/logout');
        }

        bcrypt.compare(providedPassword, hashedPassword, function (err, passwordMatch) {
            if (err) throw err;

            if (passwordMatch) {
                req.session.user = {
                    email: user.email,
                    role: user.role
                };


                if(user.role=='Administrateur'){
                    return res.redirect('/admin');
                }
                else if(user.role=='Candidat')
                {
                    return res.redirect('/home');
                }
                else if(user.role=='Recruteur')
                {
                    return res.redirect('/recruiter');
                }   
                else {
                    return res.redirect('/users/logout');
                }
                
            } else {
                return res.redirect('/users/connexion');
            }
        });
    });
});

router.post('/update', function (req, res, next) {
    var data = req.body;

    userModel.update(data.email, data.nom, data.prenom, data.tel, function(){
        console.log("user modified");
    });

    result = userModel.readall(function (result) {
        res.render('user_management', { title: 'Admin', users: result });
    });
});

router.post('/delete', function (req, res, next) {
    userModel.delete(req.body.email, function(){
        res.redirect('/user_management');
    })
})

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
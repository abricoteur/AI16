var db = require('./db.js');
const nodemailer = require('nodemailer');


module.exports = {
    read: function (email, callback) {
        db.query("select * from Utilisateurs where email = '" + email + "'", function
            (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readall: function (callback) {
        db.query("select * from Utilisateurs", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    recruteursFromOrga: function (id_orga, callback) {
        db.query("select * from Utilisateurs where id_orga= ?, role=\"recruteur\"", id_orga, function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    delete: function (email, callback) {
        db.query("SELECT role FROM Utilisateurs WHERE email = ?", email, function (err, results) {
            if (err) throw err;

            if (results[0].role) {

                if (results[0].role == "Administrateur") {
                    callback("Cannot delete user with role 'Administrateur'.");
                } else {

                    db.query("DELETE FROM Utilisateurs WHERE email = ?", email, function (err, results) {
                        if (err) throw err;
                        callback(results);
                    });
                }
            } else {
                callback("User does not exist.");
            };
        })
    },


    update: function (email, nom, prenom, tel, callback) {
        db.query("update Utilisateurs set nom=?, prenom=?, tel=? where email= ?", [nom, prenom, tel, email], function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    create: function (email, nom, prenom, mdp, tel, role, callback) {

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

        if (!isValidPassword(mdp)) {
            throw err;
        }

        function isValidEmail(email) {
            const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
            return regex.test(email);
        }

        if (!isValidEmail(email)) {
            throw err;
        }

        db.query("INSERT into Utilisateurs (email, nom, prenom, mdp, tel, role) values(?,?,?,?,?,?)", [email, nom, prenom, mdp, tel, role], function (err, results) {
            if (err) throw err;
            /*
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: '@gmail.com',
                    pass: ''
                }
            });
            const mailOptions = {
                from: '@gmail.com',
                to: email,
                subject: 'Confirmation de compte',
                text: 'Votre compte a été créé avec succès.'
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('E-mail envoyé : ' + info.response);
                }
            });
            */

            callback(results);
        });
    }
}

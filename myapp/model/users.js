var db = require('./db.js');

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
        db.query("delete from Utilisateurs where email= ?", email, function (err, results) {
            if (err) throw err;
            callback(results);
        });
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
            callback(results);
        });
    }
}

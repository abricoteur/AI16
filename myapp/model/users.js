var db = require('./db.js');

module.exports = {
    read: function (email, callback) {
        db.query("select * from Utilisateurs where email= " + "'" + email + "'", function
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

    update: function (email, nom, prenom, tel, status, role, id_orga, callback) {
        db.query("update Utilisateurs set nom=?, prenom=?, tel=?, role=? where email= ?", [nom, prenom, tel, role, email], function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    create: function (email, nom, prenom, mdp, tel, role, callback) {

        db.query("INSERT into Utilisateurs (email, nom, prenom, mdp, tel, role) values(?,?,?,?,?,?)", [email, nom, prenom, mdp, tel, role], function (err, results) {
            if (err) throw err;
            callback(results);
        });
    }
}

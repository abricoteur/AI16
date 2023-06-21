var db = require('./db.js');
module.exports = {

    request_admin: function (email, callback) {
        db.query("INSERT INTO Demandes_Role (email, role) VALUES(?,Administrateur) ON DUPLICATE KEY UPDATE role = 'Administrateur', siren=''", [email], function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    request_recruteur: function (email, siren, callback) {
        db.query("INSERT INTO Demandes_Role (email, role,siren) VALUES(?,Recruteur,?) ON DUPLICATE KEY UPDATE role = 'Recruteur', siren = ?", [email, siren, siren], function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    delete: function (user_email, callback) {
        db.query("DELETE FROM Demandes_Role WHERE email = ?", user_email, function (err, results) {
            if (err) throw err;
            callback(results);
        });
    }
}
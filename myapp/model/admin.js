var db = require('./db.js');
module.exports = {
    readOrgaCreationRequest: function (callback) {
        db.query("select * from Demandes_Creation_Organisation where status=\"pending\"", function(err, results){
            if(err) throw err;
            callback(results);
        });},

    userCount: function () {
        db.query("select COUNT(*) from Utilisateurs", function
        (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    orgaCount: function () {
        db.query("select COUNT(*) from Organisations", function
        (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    candidatureCount: function () {
        db.query("select COUNT(*) from Candidatures", function
        (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    recruiterCount: function () {
        db.query("select COUNT(*) from Utilisateurs WHERE role=\"recruteur\"", function
        (err, results) {
            if (err) throw err;
            callback(results);
        });
    }
}

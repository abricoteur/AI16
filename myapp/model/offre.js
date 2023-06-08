var db = require('./db.js');
module.exports = {
    read: function (email, callback) {
        //todo
        return false;
    },

    readall: function (callback) {
        //todo
        return false;
    },

    offreFromOrga: function (id_orga, callback) {
        db.query("select * from Offres where id_orga= ?, status=\"Publiée\"",id_orga, function(err, results){
            if(err) throw err;
            callback(results);
        });},

    areValid: function (email, password, callback) {
        //todo
        return false;
    },

    create: function (email, nom, prenom, pwd, type, callback) {
        //todo
        return false;
    },

    update: function (email, nom, prenom, password, type, callback) {
        //todo
        return false;
    },

    delete: function(email, nom, prenom, password, type, callback) {
        //todo
        return false;
    }
}
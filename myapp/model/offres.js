var db = require('./db.js');
module.exports = {
    read: function (id_offre, callback) {
        db.query("select * from Offres where id= ?",id_offre, function(err, results){
            if(err) throw err;
            callback(results);
        });
    },

    readall: function (callback) {
        db.query("select * from Offres", function(err, results){
            if(err) throw err;
            callback(results);
        });
    },

    offreFromOrga: function (siren, callback) {
        db.query("select * from Offres where siren= ?, status=\"pending\"",siren, function(err, results){
            if(err) throw err;
            callback(results);
        });},


    create: function (nom, status, responsable, type_metier, lieu, rythme, salaire, description, date, id_orga, callback) {
        db.query("INSERT INTO Offres (nom, status, responsable, type_metier, lieu, rythme, salaire, description, date, id_orga) VALUES(?,?,?,?,?,?,?,?,?,?)",[nom, status, responsable, type_metier, lieu, rythme, salaire, description, date, id_orga], function(err,results){
            if(err) throw err;
            callback(results);
        });
    },

    updateStatus: function (id_offre, status, callback) {
        db.query("UPDATE Offres SET status=? WHERE id=?",[status, id_offre], function(err,results){
            if(err) throw err;
            callback(results);
        });
    },

    delete: function(id_offre, callback) {
        db.query("DELETE FROM Offres WHERE id = ?",[id_offre], function(err,results){
            if(err) throw err;
            callback(results);
        });
    }
}
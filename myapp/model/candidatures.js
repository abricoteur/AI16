var db = require('./db.js');
module.exports = {
    read: function (id_candidature , callback) {
        db.query("select * from Candidatures where id= ?",id_candidature , function(err, results){
            if(err) throw err;
            callback(results);
        }
    );
    },

    readall: function (callback) {
        db.query("select * from Candidatures", function(err, results){
            if(err) throw err;
            callback(results);
        });
    },

    readUserCandidatures: function (id_user, callback) {
        db.query("select * from Candidatures where id_user= ?",id_user, function(err, results){
            if(err) throw err;
            callback(results);
        });
    },

    readOrganisationCandidatures: function (siren, callback) {
        db.query("select * from Candidatures where siren= ?",siren, function(err, results){
            if(err) throw err;
            callback(results);
        });
    },


    updateStatus: function (id_candidature , status, callback) {
        db.query("UPDATE Candidatures SET status=? WHERE id=?",[status, id_candidature], function(err,results){
            if(err) throw err;
            callback(results);
        });
    },


    create: function (id_user, id_offre, callback) {
        db.query("INSERT INTO Candidatures (id_user, id_offre) VALUES(?,?)",[id_user, id_offre], function(err,results){
            if(err) throw err;
            callback(results);
        });
    },

    delete: function(id_candidature , id_user, callback) {
        db.query("DELETE FROM Candidatures WHERE id_user = ? AND id = ?",[id_user, id_candidature], function(err,results){
            if(err) throw err;
            callback(results);
        });
    }
}
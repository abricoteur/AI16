var db = require('./db.js');
module.exports = {
    read: function (email, callback) {
        const query = `
            SELECT Candidatures.status as candidature_status, 
                   Offres.status as offre_status, Candidatures.*, Offres.*  
            FROM Candidatures 
            INNER JOIN Offres ON Candidatures.id_offre = Offres.id
            WHERE Candidatures.id_user = ?`;
    
        db.query(query, [email], function(err, results) {
            if(err) throw err;
            callback(results);
        });
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


    create: function (email, id_offre, siren, message, callback) {
        const query = `
            INSERT INTO Candidatures (id_user, id_offre, siren, message)
            VALUES (?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE message = ?`;
    
        db.query(query, [email, id_offre, siren, message, message], function(err, results) {
            if (err) throw err;
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
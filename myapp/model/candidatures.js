var db = require('./db.js');
const { read } = require('./users.js');
module.exports = {
    read: function (email, callback) {
        const query = `
            SELECT Candidatures.status as candidature_status, Candidatures.id as candidature_id,
                   Offres.status as offre_status, Candidatures.*, Offres.*  
            FROM Candidatures 
            INNER JOIN Offres ON Candidatures.id_offre = Offres.id
            WHERE Candidatures.id_user = ?`;

        db.query(query, [email], function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readall: function (callback) {
        db.query("select * from Candidatures", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readUserCandidatures: function (id_user, callback) {
        db.query("select * from Candidatures where id_user= ?", id_user, function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readOrganisationCandidatures: function (siren, callback) {
        db.query("SELECT c.*, o.nom AS offre_nom, u.*, p.* FROM Candidatures c INNER JOIN Offres o ON c.id_offre = o.id INNER JOIN Utilisateurs u ON c.id_user = u.email LEFT JOIN Pieces p ON c.id_user = p.user_email WHERE c.siren = ?;", [siren], function (err, results) {
          if (err) throw err;
          callback(results);
        });
      },
      
     

    updateStatus: function (id_candidature, status, callback) {
        db.query("UPDATE Candidatures SET status=? WHERE id=?", [status, id_candidature], function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },


    create: function (email, id_offre, siren, message, callback) {
        const query = `
            INSERT INTO Candidatures (id_user, id_offre, siren, message)
            VALUES (?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE message = ?`;

        db.query(query, [email, id_offre, siren, message, message], function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },


    delete: function (id_candidature, email) {
        return new Promise((resolve, reject) => {
            const deleteQuery = "DELETE FROM Candidatures WHERE id_user = ? AND id = ?";
            db.query(deleteQuery, [email, id_candidature], function (err, deleteResult) {
                if (err) reject(err);
                resolve();
            });
        });
    }




}
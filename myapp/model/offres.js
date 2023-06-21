var db = require('./db.js');
module.exports = {
    read: function (email, id_offre, callback) {
        const query = `
            SELECT Offres.*, Candidatures.message AS candidature_message 
            FROM Offres
            LEFT JOIN Candidatures ON Offres.id = Candidatures.id_offre
            WHERE Offres.id = ? AND Candidatures.id_user = ?`;
        db.query(query, [id_offre, email], function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readall: function (filtre_all, filtre_domaine, filtre_salaire, filtre_lieu, callback) {
        let sql = "SELECT * FROM Offres JOIN Organisations ON Offres.siren = Organisations.siren WHERE 1=1 & status=\"pending\"";

        let params = [];

        if (filtre_all !== undefined) {
            sql += " AND (Offres.nom LIKE ? OR Offres.responsable LIKE ? OR Offres.domaine LIKE ? OR Offres.rythme LIKE ? OR Offres.entreprise LIKE ? OR Offres.description LIKE ? OR Offres.lieu LIKE ? OR Offres.siren LIKE ?)";
            const filterPattern = `%${filtre_all}%`;
            params.push(filterPattern, filterPattern, filterPattern, filterPattern, filterPattern, filterPattern, filterPattern, filterPattern,);
        }


        if (filtre_domaine !== undefined) {
            sql += " AND domaine = ?";
            params.push(filtre_domaine);
        }

        if (filtre_salaire !== undefined) {
            sql += " AND salaire >= ?";
            params.push(filtre_salaire);
        }

        if (filtre_lieu !== undefined) {
            sql += " AND lieu LIKE ?";
            params.push(`%${filtre_lieu}%`);
        }


        db.query(sql, params, function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },



    offreFromOrga: function (siren, callback) {
        db.query("select * from Offres where siren= ?, status=\"pending\"", siren, function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },


    create: function (nom, responsable, domaine, lieu, rythme, salaire, description, siren, callback) {
        // First, retrieve the name of the organization using the provided siren.
        db.query("SELECT nom FROM Organisations WHERE siren = ?", [siren], function (err, results) {
            if (err) throw err;

            // Check if the organization exists.
            if (results.length > 0) {
                var entreprise = results[0].nom;

                db.query("INSERT INTO Offres (nom, responsable, domaine, lieu, rythme, salaire, description, siren, entreprise) VALUES(?,?,?,?,?,?,?,?,?)",
                    [nom, responsable, domaine, lieu, rythme, salaire, description, siren, entreprise],
                    function (err, insertResults) {
                        if (err) throw err;
                        callback(insertResults);
                    });
            } else {
                callback(null);
            }
        });
    },
        

    updateStatus: function (id_offre, status, callback) {
        db.query("UPDATE Offres SET status=? WHERE id=?", [status, id_offre], function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    delete: function (id_offre, callback) {
        db.query("DELETE FROM Offres WHERE id = ?", [id_offre], function (err, results) {
            if (err) throw err;
            callback(results);
        });
    }
}
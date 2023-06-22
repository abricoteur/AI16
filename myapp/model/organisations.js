var db = require('./db.js');
module.exports = {
    read: function (siren, callback) {
        db.query("select * from Organisations where siren= ?", siren, function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    readall: function (callback) {
        db.query("select * from Organisations", function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    count: function (callback) {
        db.query("select count(*) as count from Organisations", function (err, results) {
            if (err) throw err;
            callback(results[0].count);
        });
    },

    readAllInformations: function (elementsPerPage, pageNumber, callback) {
        const offset = (pageNumber - 1) * elementsPerPage;
        const query = `
        SELECT o.*, coalesce(u.recruterCount, 0) as recruterCount, coalesce(offr.offerCount, 0) as offerCount
        FROM Organisations o 
        LEFT JOIN (
            SELECT id_orga, COUNT(*) as recruterCount
            FROM Utilisateurs 
            WHERE role = 'Recruteur'
            GROUP BY id_orga
        ) u ON o.siren = u.id_orga
        LEFT JOIN (
            SELECT siren, COUNT(*) as offerCount
            FROM Offres
            GROUP BY siren
        ) offr ON o.siren = offr.siren
        ORDER BY o.siren
        LIMIT ${elementsPerPage} OFFSET ${offset}
        `;
        db.query(query, function(err, results){
            if(err) throw err;
            callback(results);
        });
    },
    
    

    create: function (siren, nom, createdBy, type_organisation, siege_social, callback) {
        db.query("INSERT INTO Organisations (siren, nom, createdBy, type_organisation, siege_social) VALUES(?,?,?,?,?)", [siren, nom, createdBy, type_organisation, siege_social], function (err, results) {
            if (err) throw err;
        });
    },

    update: function (siren, nom, siege_social, callback) {
        db.query("UPDATE Organisations SET nom=?, siege_social=? WHERE siren=?", [nom, siege_social, siren], function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    delete: function (siren, callback) {
        db.query("DELETE FROM Organisations WHERE siren = ?", siren, function (err, results) {
            if (err) throw err;
            callback(results);
        });
    }
}
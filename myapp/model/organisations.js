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
            SELECT o.*, COUNT(u.email) AS recruterCount, COUNT(offer.id) AS offerCount
            FROM Organisations o
            LEFT JOIN Utilisateurs u ON u.id_orga = o.siren
            LEFT JOIN Offres offer ON offer.siren = o.siren
            GROUP BY o.siren
            ORDER BY o.siren
            LIMIT ${elementsPerPage} OFFSET ${offset}
        `;
        db.query(query, function(err, results){
            if(err) throw err;
            callback(results);
        });
    },
    

    create: function (siren, nom, domaine, ceo, createdBy, description, adress, siege_social, callback) {
        db.query("INSERT INTO Organisations (siren,nom, domaine, ceo, createdBy, description, adress, siege_social) VALUES(?,?,?,?,?,?,?,?)", [siren, nom, domaine, ceo, createdBy, description, adress, siege_social], function (err, results) {
            if (err) throw err;
            callback(results);
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
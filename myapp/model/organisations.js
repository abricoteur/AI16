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

    readAllInformations: function (callback) {
        const query = `
            SELECT o.*, COUNT(u.email) AS recruterCount, COUNT(offer.id) AS offerCount
            FROM Organisations o
            LEFT JOIN Utilisateurs u ON u.id_orga = o.siren
            LEFT JOIN Offres offer ON offer.siren = o.siren
            GROUP BY o.siren
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

    update: function (siren, nom, domaine, ceo, description, adress, siege_social, callback) {
        db.query("UPDATE Organisations SET nom=?, domaine=?, ceo=?, description=?, adress=?, siege_social=? WHERE siren=?", [nom, domaine, ceo, description, adress, siege_social, siren], function (err, results) {
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
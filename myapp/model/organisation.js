var db = require('./db.js');
module.exports = {
    read: function (siren, callback) {
        db.query("select * from Organisations where siren= ?",siren, function(err, results){
            if(err) throw err;
            callback(results);
        });
    },

    readall: function (callback) {
        db.query("select * from Organisations", function(err, results){
            if(err) throw err;
            callback(results);
        });
    },

    create: function (siren, nom, domaine, ceo, createdBy, description, adress, siege_social ,callback) {
        db.query("INSERT INTO Organisations VALUES(?,?,?,?,?,?,?,?)",[siren, nom, domaine, ceo, createdBy, description, adress, siege_social], function(err,results){
            if(err) throw err;
            callback(results);
        });
    },

    update: function (siren, nom, domaine, ceo, description, adress, siege_social, callback) {
        db.query("UPDATE Organisations SET nom=?, domaine=?, ceo=?, description=?, adress=?, siege_social=? WHERE siren=?",[nom, domaine, ceo, description, adress, siege_social, siren], function(err,results){
            if(err) throw err;
            callback(results);
        });
    },

    delete: function(siren,callback) {
        db.query("DELETE FROM Organisations WHERE siren = ?",siren, function(err,results){
            if(err) throw err;
            callback(results);
        });     
    }
}
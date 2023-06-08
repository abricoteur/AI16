var db = require('./db.js');
module.exports = {
    read: function (request_id, callback) {
        db.query("select * from requestCreateOrganisation where request_id= ?",request_id, function(err, results){
            if(err) throw err;
            callback(results);
        });
    },

    readall: function (callback) {
        db.query("select * from requestCreateOrganisation", function(err, results){
            if(err) throw err;
            callback(results);
        });
    },

    create: function (requester_id, status, message, object, siren, siege_social, domaine, nom, callback) {
        db.query("INSERT INTO requestCreateOrganisation VALUES(?,?,?,?,?,?,?,?)",[requester_id, status, message, object, siren, siege_social, domaine, nom], function(err,results){
            if(err) throw err;
            callback(results);
        });
    },

    update: function (siren, status, nom, domaine, ceo, description, adress, siege_social, callback) {
        db.query("UPDATE Organisations SET nom=?, status=?, domaine=?, ceo=?, description=?, adress=?, siege_social=? WHERE siren=?",[nom,status, domaine, ceo, description, adress, siege_social, siren], function(err,results){
            if(err) throw err;
            callback(results);
        });
    },

    updateStatus: function (request_id, status, callback) {
        db.query("UPDATE requestCreateOrganisation SET status=? WHERE request_id=?",[status, request_id], function(err,results){
            if(err) throw err;
            callback(results);
        });
    },

    delete: function(siren,callback) {}
    
}
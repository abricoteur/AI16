var db = require('./db.js');
module.exports = {
    read: function (request_id, callback) {
        db.query("select * from Demandes_Creation_Organisation where request_id= ?",request_id, function(err, results){
            if(err) throw err;
            callback(results);
        });
    },

    readall: function (trie, callback) {
        var orderBy = (trie == "recent") ? "ORDER BY date DESC" : "ORDER BY date ASC";
      
        db.query("SELECT * FROM Demandes_Creation_Organisation " + orderBy, function(err, results) {
          if (err) throw err;
          callback(results);
        });
      },
      

    create: function (email, siren, siege_social, nom, message,type_organisation, callback) {
        db.query("INSERT INTO Demandes_Creation_Organisation (requester_email, siren, siege_social, nom, message,type_organisation) VALUES(?,?,?,?,?,?)",[email, siren, siege_social, nom,message,type_organisation], function(err,results){
            if(err) throw err;
            callback(results);
        });
    },

    update: function (siren, status, nom, ceo, description, adress, siege_social, callback) {
        db.query("UPDATE Organisations SET nom=?, status=?, ceo=?, description=?, adress=?, siege_social=? WHERE siren=?",[nom,status, ceo, description, adress, siege_social, siren], function(err,results){
            if(err) throw err;
            callback(results);
        });
    },

    updateStatus: function (request_id, status, callback) {
        db.query("UPDATE Demandes_Creation_Organisation SET status=? WHERE request_id=?",[status, request_id], function(err,results){
            if(err) throw err;
            callback(results);
        });
    },

    delete: function(siren,callback) {}
    
}
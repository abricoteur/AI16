var db = require('./db.js');
module.exports = {

  request_admin: function (email, callback) {
    db.query("INSERT INTO Demandes_Role (requester_email, requested_role) VALUES(?,'Administrateur') ON DUPLICATE KEY UPDATE requested_role = 'Administrateur', siren=NULL", [email], function (err, results) {
      if (err) throw err;
      callback(results);
    });
  },
  request_recruteur: function (email, siren, callback) {
    db.query(
      "INSERT INTO Demandes_Role (requester_email, requested_role, siren) VALUES (?, 'Recruteur', ?) ON DUPLICATE KEY UPDATE requested_role = 'Recruteur', siren = ?",
      [email, siren, siren],
      function (err, results) {
        if (err) {
          // Handle the error
          console.error("Error occurred while inserting the request:", err);
          // Pass the error to the callback function
          callback(err, null);
          return;
        }
        callback(null, results);
      }
    );
  },


  readRecruiter: function (siren, callback) {
    db.query("SELECT * FROM Demandes_Role WHERE siren = ?", siren, function (err, results) {
      if (err) throw err;
      callback(results);
    });
  },

  readAllAdminRequest: function (trie, callback) {
    var orderBy = (trie == "recent") ? "ORDER BY date DESC" : "ORDER BY date ASC";
    db.query("SELECT * FROM Demandes_Role WHERE requested_role = 'administrateur'" + orderBy, function (err, results) {
      if (err) throw err;
      callback(results);
    });
  },

  updateStatus: function (email, role, callback) {
    db.query("UPDATE Utilisateurs SET role =? WHERE email = ?", [role, email], function (err, results) {
      if (err) throw err;
      callback(results);
    });
  },

  acceptRecruiter: function (siren, email, callback) {
    db.query("SELECT requester_email FROM Demandes_Role WHERE siren = ? & requester_email = ?", [siren, email], function (err, results) {
      if (err) throw err;

      if (results.length > 0) {
        var requester_email = results[0].requester_email;
        db.query("INSERT INTO Registre_Demandes_Role SELECT *, 'accepted' AS status FROM Demandes_Role WHERE requester_email = ?", [requester_email], function (err, insertResults) {
          if (err) throw err;
        }
        );

        db.query("UPDATE Utilisateurs SET role = 'Recruteur', siren = ? WHERE email = ?", [siren, requester_email], function (err, updateResults) {
          if (err) throw err;
          callback(updateResults);
        });

        db.query("DELETE FROM Demandes_Role WHERE requester_email = ?", [requester_email], function (err, deleteResults) {
          if (err) throw err;

          callback(deleteResults);
        });
      } else {
        callback(null);
      }
    });
  },

  refuseRecruiter: function (siren, email, callback) {
    db.query("SELECT requester_email FROM Demandes_Role WHERE siren = ? & requester_email = ?", [siren, email], function (err, results) {
      if (err) throw err;
      db.query("INSERT INTO Registre_Demandes_Role SELECT *, 'rejected' AS status FROM Demandes_Role WHERE requester_email = ?", [email], function (err, insertResults) {
        if (err) throw err;

        db.query("DELETE FROM Demandes_Role WHERE requester_email = ?", [email], function (err, deleteResults) {
          if (err) throw err;

          callback(deleteResults);
        });
      });
    });
  },


  acceptAdmin: function (email, callback) {

    db.query("INSERT INTO Registre_Demandes_Role SELECT *, 'accepted' AS status FROM Demandes_Role WHERE requester_email = ?", [email], function (err, insertResults) {
      if (err) throw err;
      db.query("UPDATE Utilisateurs SET role = 'Administrateur' WHERE email = ?", [email], function (err, updateResults) {
        if (err) throw err;
        db.query("DELETE FROM Demandes_Role WHERE requester_email = ?", [email], function (err, deleteResults) {
          if (err) throw err;

          callback(deleteResults);
        });
      });
    }
    );




  },

  refuseAdmin: function (email, callback) {
    db.query("INSERT INTO Registre_Demandes_Role SELECT *, 'rejected' AS status FROM Demandes_Role WHERE requester_email = ?", [email], function (err, insertResults) {
      if (err) throw err;

      db.query("DELETE FROM Demandes_Role WHERE requester_email = ?", [email], function (err, deleteResults) {
        if (err) throw err;

        callback(deleteResults);
      });
    });
  }

}
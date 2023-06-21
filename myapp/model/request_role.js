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

  delete: function (user_email, callback) {
    db.query("DELETE FROM Demandes_Role WHERE email = ?", user_email, function (err, results) {
      if (err) throw err;
      callback(results);
    });
  },

  readRecruiter: function (siren, callback) {
    db.query("SELECT * FROM Demandes_Role WHERE siren = ?", siren, function (err, results) {
      if (err) throw err;
      callback(results);
    });
  },



  acceptRecruiter: function (siren, email, callback) {
    db.query("SELECT requester_email FROM Demandes_Role WHERE siren = ? & requester_email = ?", [siren, email], function (err, results) {
      if (err) throw err;

      // Check if the request exists.
      if (results.length > 0) {
        var requester_email = results[0].requester_email;

        // Then, update the user's role in the Utilisateurs table.
        db.query("UPDATE Utilisateurs SET role = 'Recruteur', siren = ? WHERE email = ?", [siren, requester_email], function (err, updateResults) {
          if (err) throw err;
          callback(updateResults);
        });
      } else {
        callback(null);
      }
    });
  },

  refuseRecruiter: function (siren, email, callback) {
    db.query("DELETE FROM Demandes_Role WHERE siren = ? & requester_email = ?", [siren, email], function (err, results) {
      if (err) throw err;
      callback(results);
    });
  }

}
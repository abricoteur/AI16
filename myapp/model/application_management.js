var db = require('./db.js');
module.exports = {
    read: function (email, callback) {
        db.query("select * from Utilisateurs where email= ?",email, function
        (err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    readall: function (callback) {
        db.query("select * from utilisateurs", function (err, results) {
        if (err) throw err;
        callback(results);
        });
    },
    areValid: function (email, password, callback) {
    sql = "SELECT pwd FROM USERS WHERE email = ?";
    rows = db.query(sql, email, function (err, results) {
        if (err) throw err;
        if (rows.length == 1 && rows[0].pwd === password) {
            callback(true)
        } else {
            callback(false);
        }
    });
    },
    create: function (email, nom, prenom, pwd, tel,dateCreation, statut, role, id_orga, callback) {
    //todo
        sql = "INSERT INTO Utilisateurs VALUES(email, nom, prenom, pwd, tel,dateCreation, statut, role, id_orga)";
        rows = db.query(sql, function(err,results){
            if(err) throw err;
            callback(results);
        });
    }
}

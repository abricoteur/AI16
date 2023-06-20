var db = require('./db.js');
module.exports = {
    read: function (id_offre, callback) {
        db.query("select * from Offres where id= ?",id_offre, function(err, results){
            if(err) throw err;
            callback(results);
        });
    },

    readall: function (filtre_all, filtre_domaine, filtre_salaire, filtre_lieu, callback) {
        let sql = "SELECT * FROM Offres JOIN Organisations ON Offres.siren = Organisations.siren WHERE 1=1";

        let params = [];
    
        if (filtre_all !== undefined) {
            sql += " AND (Offres.nom LIKE ? OR Offres.responsable LIKE ? OR Offres.type_metier LIKE ? OR Offres.rythme LIKE ? OR Offres.entreprise LIKE ? OR Offres.description LIKE ? OR Organisations.description LIKE ? OR Offres.lieu LIKE ? OR Offres.siren LIKE ?)";
            const filterPattern = `%${filtre_all}%`;
            params.push(filterPattern, filterPattern, filterPattern, filterPattern, filterPattern, filterPattern, filterPattern, filterPattern,filterPattern,);
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
        
    
        db.query(sql, params, function(err, results) {
            if (err) throw err;
            callback(results);
        });
    },
    
    

    offreFromOrga: function (siren, callback) {
        db.query("select * from Offres where siren= ?, status=\"pending\"",siren, function(err, results){
            if(err) throw err;
            callback(results);
        });},


    create: function (nom, status, responsable, type_metier, lieu, rythme, salaire, description, date, id_orga, callback) {
        db.query("INSERT INTO Offres (nom, status, responsable, type_metier, lieu, rythme, salaire, description, date, id_orga) VALUES(?,?,?,?,?,?,?,?,?,?)",[nom, status, responsable, type_metier, lieu, rythme, salaire, description, date, id_orga], function(err,results){
            if(err) throw err;
            callback(results);
        });
    },

    updateStatus: function (id_offre, status, callback) {
        db.query("UPDATE Offres SET status=? WHERE id=?",[status, id_offre], function(err,results){
            if(err) throw err;
            callback(results);
        });
    },

    delete: function(id_offre, callback) {
        db.query("DELETE FROM Offres WHERE id = ?",[id_offre], function(err,results){
            if(err) throw err;
            callback(results);
        });
    }
}
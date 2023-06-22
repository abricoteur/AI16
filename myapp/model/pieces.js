var db = require('./db.js');
module.exports = {
    read: function (user_email, callback) {
        db.query("SELECT file, filename FROM Pieces WHERE user_email = ?", user_email, function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },

    upload: function (email, file, callback) {
        const fs = require('fs');
        const fileBuffer = fs.readFileSync(file.path);
        const fileBlob = fileBuffer.toString('base64');

        // Upload the file to the database
        let uploadFileQuery = `INSERT INTO Pieces (user_email, file, filename) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE file = ?, filename = ?`;

        db.query(uploadFileQuery, [email, fileBlob, file.originalname, fileBlob, file.originalname], function (err, results) {
            if (err) throw err;
            callback(results);
        });
    },
}
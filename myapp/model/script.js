var mysql = require("mysql");

var pool = mysql.createPool({
    host: "localhost", //ou localhost
    user: "root",
    password: "",
    database: "ai16"
});

module.exports = pool;

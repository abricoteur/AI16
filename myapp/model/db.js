var mysql = require("mysql");
var pool = mysql.createPool({
host: "localhost", //ou localhost
user: "root",
password: "Li0134102754*",
database: "ai16"
});
module.exports = pool;  
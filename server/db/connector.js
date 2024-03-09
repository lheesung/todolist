const mysql = require("mysql2");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "todo",
  password: "1111",
  Promise: require("bluebird"),
});

module.exports = connection;

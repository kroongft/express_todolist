const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "spark1234",
  database: "express_db",
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected");
});

module.exports = db;

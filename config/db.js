const mysql = require("mysql2");

const connecion = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER1,
  password: process.env.PASSWORD,
  database: process.env.DB,
});

module.exports = connecion;

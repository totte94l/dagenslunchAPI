const mysql = require('mysql2');

const connection = mysql.createPool({
  host: 'mysql507.loopia.se',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

module.exports = connection;
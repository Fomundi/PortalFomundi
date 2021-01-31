const mysql = require('mysql');

console.log("Base de datos conectada")

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'fomundi',
  password: '98092410',
  port: 3306,
  database: 'portalfomundi'
});
/*
const connection = mysql.createConnection({
  host: 'mysql-fomundi.alwaysdata.net',
  user: 'fomundi',
  password: 'Peteralveiro7',
  port: 3306,
  database: 'fomundi_portalfomundi'
});
*/

module.exports = connection;
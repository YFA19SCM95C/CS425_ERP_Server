const mysql = require("mysql");
const util = require('util');

const config = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '57885788',
  database: 'ERP',
  connectionLimit: 100
};

const pool = mysql.createPool(config);

// Ping database to check for common exception errors.
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.')
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.')
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.')
    }
  }

  if (connection) connection.release()

  return
})

pool.query = util.promisify(pool.query)

module.exports =  pool;

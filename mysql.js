const mysql = require('mysql');
const config = require('./config/config');


//MYSQL CONNECTION

const sqlConnection = mysql.createPool(config.dbConfig);
// Attempt to catch disconnects 
sqlConnection.on('connection', function (connection) {
    console.log('DB Connection established');
  
    connection.on('error', function (err) {
      console.error(new Date(), 'MySQL error', err.code);
    });
    connection.on('close', function (err) {
      console.error(new Date(), 'MySQL close', err);
    });

});


module.exports = sqlConnection;
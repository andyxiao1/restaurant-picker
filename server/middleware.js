const oracledb = require('oracledb');
const dbConfig = require('./dbconfig.js');

// attaches a new db connection to every request
const oracleMiddleware = (req, res, next) => {
  oracledb.getConnection(dbConfig, (err, conn) => {
    if (err) {
      console.log(err);
    } else {
      req._oracledb = conn;
      next();
    }
  });
};

module.exports = { oracleMiddleware };

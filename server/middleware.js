const oracledb = require('oracledb');
oracledb.autoCommit = true;
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

// closes db connection
const onFinishMiddleware = (req, res, next) => {
  res.on('finish', () => {
    req._oracledb.close().catch((err) => console.log(err));
  });
  next();
};

module.exports = { oracleMiddleware, onFinishMiddleware };

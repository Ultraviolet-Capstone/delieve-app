var mysql = require('promise-mysql');
var config = require('../config/config.js')[process.env.NODE_ENV || 'development'];


mysqlService = {
  generatePool : function() {
    this.pool = mysql.createPool({
      connectionLimit : 10,
      host     : config.db_host,
      user     : config.db_user,
      password : config.db_password,
      port     : config.db_port,
      database : config.db_database,
    });
  },
  query : function(res, query, arr) {
    return this.pool.query(query, arr)
    .catch(err => {
      res.json(err);
    })
  }
}

module.exports = mysqlService;
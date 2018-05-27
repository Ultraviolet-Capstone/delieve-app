var dvDeliverergQuery = require('../../../models/dv-deliverer-query');
var mysqPool = require('../../../common/database/mysql');
mysqPool.generatePool();

const dvMatchingService = {
  updateDelivererStatus: function(req) {
    var {status, delivererId} = req.body;
    return dvDeliverergQuery.updateDelivererStats(mysqPool, delivererId, status)
      .then (result => {
        return Promise.resolve({ status: status, result: result }); 
      })
      .catch(err => {
        return Promise.reject({ status: 500, message: err.Error });
      })
  },
}
module.exports = dvMatchingService;
var express = require('express'); 

var authService = require('./auth-service');
var router = express.Router();

router.get('/admin/token', (req, res, next) => {
  authService.generateTokenForAdmin(req, res)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(err.status).send(err);
    });
});

module.exports = router;
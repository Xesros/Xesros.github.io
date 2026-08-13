var express = require('express');
var router = express.Router();
var controller = require('../controllers/anishelter');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'HomePage' });
});

module.exports = router;
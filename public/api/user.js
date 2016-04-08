var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var User = require('../models/User.js');

router.post('/', function(req, res) {
	var user = new User();

	//copy props by name
	for(var k in req.body) user[k]=req.body[k];

  user.save();
  

});

module.exports = router;

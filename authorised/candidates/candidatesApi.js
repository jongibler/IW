var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var Candidate = require('../../models/Candidate.js');


router.get('/', function(req, res) {
	Candidate.find(function(err, persons) {
		if (err){
			console.log(err);
			res.status(500).send(err);
			return;
		}
		res.json(persons);
	});
});


module.exports = router;

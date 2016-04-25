var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var Candidate = require('../../models/Candidate.js');


router.get('/getPage/:number', function(req, res) {
	var pageNumber = req.params.number;
	Candidate.find(function(err, candidates) {
		if (err){
			console.log(err);
			res.status(500).send(err);
			return;
		}
		Candidate.count({}, function(err, count){
			res.json({page: candidates, lastPageNumber: Math.ceil(count/10)})
		});		
	})
	.limit(10)
	.skip((pageNumber-1)*10)
	.sort('firstName');
});



module.exports = router;

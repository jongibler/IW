var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var Candidate = require('../../models/Candidate.js');


router.get('/getPage/:number', function(req, res) {
	var pageNumber = req.params.number;
  console.log(new Date(Date.now()) + ' - ' + req.query.filter);

	var query = Candidate.find({});

	if (req.query.filter != '') {
		var filterWords = req.query.filter.split(' ');
		var filterArray = [];
		filterWords.forEach(function(filterWord){
			filterArray.push(new RegExp(filterWord));
		});
		query = Candidate.find({$or: [
			{tags:{$in:filterArray}},
			{firstName:{$in:filterArray}}
		]});
	}



	query.limit(10)
	.skip((pageNumber-1)*10)
	.sort('firstName');

	query.exec(function(err, candidates) {
		if (err){
			console.log(err);
			res.status(500).send(err);
			return;
		}

		//TODO: GET FILTERED COUNT
		Candidate.count({}, function(err, count){
			res.json({page: candidates, lastPageNumber: Math.ceil(count/10)})
		});

	})
});



module.exports = router;

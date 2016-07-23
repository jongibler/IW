var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser());

var Talent = require('../models/Talent.js');


router.post('/', function (req, res) {
	res.header("Access-Control-Allow-Origin", "http://localhost:8080");

    var talent = new Talent();
	//copy props by name
	for (var k in req.body) talent[k] = req.body[k];

    talent.save(function (err, talent) {
        if (err) {
            res.status(500).send(err);
        }
        res.json(talent);
    });

});

//todo: auth
router.get('/', function (req, res) {
	Talent.find(function (err, talents) {
		if (err) {
			console.log(err);
			res.status(500).send(err);
			return;
		}
		res.json(talents);
	});
});


module.exports = router;
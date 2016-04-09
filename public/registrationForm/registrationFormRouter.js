var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var passwordHash = require('password-hash');
var generatePassword = require('password-generator');
var User = require('../../models/User.js');
var emailSender = require('../../modules/emailSender.js');

router.post('/', function(req, res) {
	var user = new User();
	//copy props by name
	for(var k in req.body) user[k]=req.body[k];
	var generatedPassword = generatePassword();
	user.password = passwordHash.generate(generatedPassword);
	user.save(function(err){
		if (err) {
			res.status(500).send(JSON.stringify(err));
		}
		else {
			sendEmail(user, generatedPassword, req);
			res.send("OK");
		}
	});

});

function sendEmail(user, generatedPassword, req) {
	var ejs = require('ejs');

	ejs.renderFile('public/registrationForm/registrationFormEmailTemplate.ejs',
		{ user:user, generatedPassword:generatedPassword} ,
		function (err, html) {
			if (err) {
				console.log(err);
			}
			else {
				var mailOptions = {
			      from: '"Intelligent Ways" <minimalnode@gmail.com>', // sender address
			      to: 'jgibler@gmail.com', // list of receivers
			      subject: 'Registration confirmation', // Subject line
			      html: html // html body
			  };
				emailSender.send(mailOptions);
			}
	});
	// var ejs = require('ejs'),
	// fs = require('fs'),
	// file = fs.readFileSync('public/registrationForm/registrationFormEmailTemplate.ejs', 'utf-8');
	// rendered = ejs.render(file, { user: { email:user.email, generatedPasswor:generatedPassword } });
	//console.log(rendered);
}


module.exports = router;

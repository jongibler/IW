var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
	email : String,
	password : String,
  companyName: String,
  firstName: String,
  surname: String
});

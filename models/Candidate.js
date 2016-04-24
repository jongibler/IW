var mongoose = require('mongoose');

module.exports = mongoose.model('Candidate', {
  firstName: String,
  surname: String,
	tags: Array
});

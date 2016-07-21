var mongoose = require('mongoose');

var TalentSchema = new mongoose.Schema({
    name: String,
    email: String,
    skills: Array,
    cvURL: String
});

module.exports = mongoose.model('Talent', TalentSchema);

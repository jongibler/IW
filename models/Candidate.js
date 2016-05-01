var mongoose = require('mongoose');
var CandidateSchema = new mongoose.Schema({
    firstName: String,
    surname: String,
    tags: Array,
    thumbUrl: String
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});
CandidateSchema.virtual('fullName')
.get(function() {
  return this.firstName + ' ' + this.surname;
});
module.exports = mongoose.model('Candidate', CandidateSchema);

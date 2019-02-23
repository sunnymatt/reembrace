// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  cell: { type: String, required: true, unique: true },
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'SurveyQuestion' }
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;
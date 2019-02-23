// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  cell: { type: String, required: true, unique: true },
  full_name: String,
  age: Number,
  gender: String,
  street_address: String,
  city_of_residence: String,
  ZIP_code: String,
  inApplication: {type: Boolean, default: false},
  updatingInfo: {type: Boolean, default: false},
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'SurveyQuestion' },
  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SurveyQuestion' }]
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;
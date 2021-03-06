var mongoose = require('mongoose');

var SurveyQuestionSchema = new mongoose.Schema({
    question: String,
    option: String,
    apply: { type: Boolean, default: false },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'SurveyQuestion' }
  });
  
  var SurveyQuestion = mongoose.model('SurveyQuestion', SurveyQuestionSchema);

  module.exports = SurveyQuestion;
var mongoose = require('mongoose');
var SurveyQuestion = mongoose.model('SurveyQuestion');

function populateInfo() {
    var start = new SurveyQuestion({
        question: "Hi there! What resources are you interested in today?",
        option: '',
    });
    start.save(function(err, obj) {
        if (err) throw err;
        var health = new SurveyQuestion({
            question: "Got it - you're looking for health-related information. Which of the following health services are you interested in right now?",
            option: 'Health',
            parent: obj._id,
        });
        health.save(function(err, obj) {
            if (err) throw err;
        });
        var housing = new SurveyQuestion({
            question: "Got it - you're looking for housing-related information. Which of the following housing services are you interested in right now?",
            option: 'Housing',
            parent: obj._id,
        });
        housing.save(function(err, obj) {
            if (err) throw err;
        });
        var food = new SurveyQuestion({
            question: "Got it - you're looking for food-related information. Which of the following food services are you interested in right now?",
            option: 'Food',
            parent: obj._id,
        });
        food.save(function(err, obj) {
            if (err) throw err;
        });
        var parole = new SurveyQuestion({
            question: "Got it - you're looking for parole-related information. Which of the following parole services are you interested in right now?",
            option: 'Parole',
            parent: obj._id,
        });
        parole.save(function(err, obj) {
            if (err) throw err;
        });
    });
}

module.exports = populateInfo;
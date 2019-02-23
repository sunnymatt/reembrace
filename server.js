const fs = require('fs')
let keys;

try {
    if (fs.existsSync('./playground/twilio/keys.js')) {
        keys = require('./playground/twilio/keys.js') // create a keys.js in same folder, populate with keys accordingly
    }
} catch(err) {
    keys = {
        accountSid: processs.env.twilioAccountSid,
        authToken: process.env.twilioAuthToken
    }
}

const http = require('http');
const express = require('express');
var bodyParser = require("body-parser");
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const port = process.env.PORT || 1337;

const app = express();
app.use(bodyParser.urlencoded({extended: false}))

var mongoose = require('mongoose');
var SurveyQuestion = require('./models/SurveyQuestions');
var User = require('./models/Users');
var init = require('./models/init');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/reembrace', function(err) {
  if(err) throw err;

  SurveyQuestion.countDocuments({}, function( err, count){
    console.log("Number of survey questions in database: " + count);
    if(count === 0) {
      init();
      console.log("Should have initialized...")
    }
  })

  app.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();

    User.countDocuments({cell: req.body.From}, function(err, count) {
      if(count === 0) { // the person texting in is a new user
        console.log("Doesn't match any existing users!");
        SurveyQuestion.findOne({option: ''}, function(err, obj) { // we start off with the default question
          SurveyQuestion.find({parent: obj._id}, function(err, options) {
            var newUser = User({
              cell: req.body.From,
              question: obj._id
            });
            newUser.save(function(err, user) {  
              console.log("New user saved with cell " + user.cell);
              var textResponse = obj.question;
              textResponse += "\n\nChoices:\n\n" + options.map(x => x.option).reduce((accumulator, curVal) => accumulator + "\n" + curVal);
              twiml.message(textResponse);
              res.send(twiml.toString());
            });
          });
        });
      }
      else { // this user is known to us
        if(req.body.Body.toLowerCase().trim() == "done") { // serves as a "restart"
          User.updateOne({cell: req.body.From}, {question: null}, function(err){ // reset to the start of the question flow
            var textResponse = "Got it - you're done for now. Text us again if you need anything!";
            twiml.message(textResponse);
            res.send(twiml.toString())
          });
        }
        else {
          User.findOne({cell: req.body.From}, function(err, user){
            if(user.question) { // if the user is responding to a question we already asked
              SurveyQuestion.findOne({_id: user.question}, function(err, q){
                SurveyQuestion.find({parent: user.question}, function(err, options) {
                  idx = -1 
                  // find which choice the user chose
                  for(var i = 0; i < options.length; i++) {
                    if(options[i].option.toLowerCase() === req.body.Body.toLowerCase()) {
                      idx = i;
                      break;
                    }
                  }
                  if(idx === -1) { // response didn't match one of the choices
                    var textResponse = "I'm sorry, I didn't understand that. Could you respond with one of the choices listed above? To reset or stop, reply with \"DONE.\"";
                    twiml.message(textResponse);
                    res.send(twiml.toString());
                  } else { // based on the user's choice, send a new question and update their question tracker field
                    SurveyQuestion.find({parent: options[idx]._id}, function(err, nextOptions){
                      User.updateOne({cell: req.body.From}, {question: options[idx]._id}, function(err) {
                        var textResponse = options[idx].question;
                        textResponse += (nextOptions.length > 0 ? "\n\nChoices:\n\n" + nextOptions.map(x => x.option).reduce((accumulator, curVal) => accumulator + "\n" + curVal) : "");
                        twiml.message(textResponse);
                        res.send(twiml.toString())
                      });
                    });
                  }
                });
              });
            } else { // the user just initiated a text 
              SurveyQuestion.findOne({option: ''}, function(err, obj) {
                SurveyQuestion.find({parent: obj._id}, function(err, options) {
                  User.updateOne({cell: req.body.From}, {question: obj._id}, function(err) { // update the tracking function
                    var textResponse = obj.question;
                    textResponse += "\n\nChoices:\n\n" + options.map(x => x.option).reduce((accumulator, curVal) => accumulator + "\n" + curVal);
                    twiml.message(textResponse);
                    res.send(twiml.toString());
                  });
                });
              });
            }
          });
        }
      }
    })
    
  
    
  });
  
  http.createServer(app).listen(port, () => {
    console.log('Express server listening on port ' + port);
  });
});

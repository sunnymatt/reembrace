const fs = require('fs')
const path = require("path")

const http = require('http');
const express = require('express');
var bodyParser = require("body-parser");
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const port = process.env.PORT || 1337;

const app = express();
// app.use middleware
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(path.join(__dirname, "client", "build")))

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

  app.get('/api/questions/start', (req, res) => {
    SurveyQuestion.findOne({option: ''}, function(err, obj) { // we start off with the default question
      res.send(obj);
    });
  });

  app.get('/api/questions/:id/children', (req, res) => {
    SurveyQuestion.find({parent: req.params.id}, function(err, objs) { // we start off with the default question
      res.send(objs);
    });
  });

  app.get('/api/questions/:id', (req, res) => {
    SurveyQuestion.findById(req.params.id, function(err, obj) { // we start off with the default question
      res.send(obj);
    });
  });


  app.post('/api/questions/:id', (req, res) => {
    SurveyQuestion.findByIdAndUpdate(req.params.id, req.body, function(err, q) { // successfully updated
      console.log(req.body);
      console.log("Successfully updated!");
      res.end();
    });
  });

  app.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();
    var message = req.body.Body.toLowerCase().trim();

    function emptyProperties(user) {
      var props = []
      for(var infoProperty of ["full_name", "age", "gender", "street_address", "city_of_residence", "ZIP_code"]){
        if(!user[infoProperty]) {
          props.push(infoProperty);
        }
      }
      return props;
    }

    function userInfoSummary(user) {
      var summ = "";
      // assumes all the properties are filled in with correct values
      for(var infoProperty of ["full_name", "age", "gender", "street_address", "city_of_residence", "ZIP_code"]){
          summ += "\n" + infoProperty.split("_").join(" ") + ": " + user[infoProperty];
      }
      return summ;
    }

    function updateUser(user, message) {
      fields = message.split(", ");
      fields[0] = fields[0].toLowerCase().trim().split(" ").join("_");
      console.log(fields[0])
      if(["full_name", "age", "gender", "street_address", "city_of_residence", "ZIP_code"].includes(fields[0])) {
        user[fields[0]] = fields[1];
      }
    }

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
        if(message == "done") { // serves as a "restart"
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
                if(q.apply) { 
                  if(message === "apply") { // user wants to apply to program
                    User.updateOne({cell: req.body.From}, {inApplication: true}, function(err){
                      emptyProps = emptyProperties(user);
                      if(emptyProps.length === 0) { // user already has all properties filled in
                        var textResponse = "Great! Here's the information we already have on file for you.\n";
                        textResponse += userInfoSummary(user);
                        textResponse += "\n\nIs all of this information correct?";
                        twiml.message(textResponse);
                        res.send(twiml.toString());
                      } else {
                        var textResponse = "What is your " + emptyProps[0].split("_").join(" ") + "?";
                        twiml.message(textResponse);
                        res.send(twiml.toString());
                      }
                    });
                  } else if (user.inApplication) {
                    emptyProps = emptyProperties(user);
                    if(emptyProps.length > 0) { // user just responded to a question about their information
                      console.log(emptyProps);
                      console.log(req.body.Body);
                      user[emptyProps[0]] = req.body.Body; // set the property
                      user.save(function(e, u){
                        if(emptyProps.length > 1) {
                          var textResponse = "What is your " + emptyProps[1].split("_").join(" ") + "?";
                          twiml.message(textResponse);
                          res.send(twiml.toString());
                        } else { // done!!!! woohoo
                          user.applications.push(q._id);
                          user.inApplication = false;
                          user.question = null;
                          user.save(function(e, u){
                            console.log("User with name " + user.full_name + " applied to " + q.option);
                            var textResponse = "Great! That's all we need. We've submitted your application. You'll hear back as soon as we have an update."
                            textResponse += "\n\nHere's a summary of the information we submitted in your application: " + userInfoSummary(u);
                            twiml.message(textResponse);
                            res.send(twiml.toString())
                          });
                        }
                      });
                    }
                    else if(user.updatingInfo) { // assume response is corrected information
                      console.log(req.body.Body);
                      updateUser(user, req.body.Body);
                      console.log(user);
                      user.updatingInfo = false;
                      user.save(function(e, u){
                        var textResponse = "Thanks for the update! Here's the information we now have on file for you.\n";
                        textResponse += userInfoSummary(u);
                        textResponse += "\n\nIs all of this information correct?";
                        twiml.message(textResponse);
                        res.send(twiml.toString());
                      });
                    }
                    else {
                      if(message === "yes") { // the information we have on file is correct!
                        user.applications.push(q._id);
                        user.inApplication = false;
                        user.question = null;
                        user.save(function(e, u){
                          console.log("User with name " + user.full_name + " applied to " + q.option);
                          var textResponse = "Great! We've submitted your application. You'll hear back as soon as we have an update."
                          twiml.message(textResponse);
                          res.send(twiml.toString())
                        });
                      } else {
                        user.updatingInfo = true;
                        user.save(function(e, u){
                          var textResponse = "Let's get your info up to date. Please enter the field and corrected value. For example: \"full name, John Smith\"."
                          twiml.message(textResponse);
                          res.send(twiml.toString())
                        });
                      }
                    }
                    
                  }
                } else {
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
                          if(options[idx].apply && !user.applications.some((app) => app.equals(options[idx]._id))) {
                            textResponse += "\n\nGood news - you can apply for this program now via text. Send \"apply\" if you'd like to apply now. Otherwise, send \"done\" if you're satisfied."
                          }
                          twiml.message(textResponse);
                          res.send(twiml.toString())
                        });
                      });
                    }
                  });
                }
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

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
  
  http.createServer(app).listen(port, () => {
    console.log('Express server listening on port ' + port);
  });
});

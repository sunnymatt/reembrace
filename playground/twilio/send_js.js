var keys = require('./keys.js') // create a keys.js in same folder, populate with keys accordingly

// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
const client = require('twilio')(keys.accountSid, keys.authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+15712660400',
     to: '+15714328734'
   })
  .then(message => console.log(message.sid));

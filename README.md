# reembrace
This is the open-source repository for our team's submission to the 2019 SIG/SIEPR Policy Hackathon. "reembrace" is the codename for our policy proposal, which is a play on words on the term "reentry" and the term "wraparound services." Wrap-around services have actaully been shown to be _harmful_ in that they can lead to increased recidivism rates (Doleac 2019). One hypothesis for why wraparound services impact people released from prison in a negative manner is that they overwhelm and frustrate subjects with constant check-ins and mandatory appointments, creating obligations and furthering resentment toward the system.

We envision a better version of wraparound services that we term an "reembrace" into society. Rather than forcing people who are reentering society into a suite of programs they may not want or need, we create an accessible text service that centers around the released person and provides them with choices to pursue whatever resources they desire, at the tips of their fingerips.

View our (fictitious) policy memo [here](https://drive.google.com/open?id=1Y0IeEWRwtCkW1DdODLODF7Pjk0lrnpUi) and our slides [here](https://drive.google.com/open?id=1ZunFIBapL15QROHFX0T5AEGIxlU0lNQRenkhj-2rtA0)!

## Demo
You can view full-length videos of our demos of various aspects of our app at the following links. We've also provided shorter GIF versions below.

### Texting service demo
---
[Full video link](https://drive.google.com/open?id=1elOSXvyYF6eW1tkyHIsMqr8El5zjdFGm)  
<img src="https://i.imgur.com/I2waMiy.gif" data-canonical-src="https://i.imgur.com/I2waMiy.gif" alt="Texting service demo GIF" height="400" height="auto" />

### Admin dashboard demo
---
[Full video link](https://drive.google.com/open?id=19cOxLMBC9qxG0ZaOuHsJzNcQckTyBmKL)  
![Admin dashboard demo GIF](https://i.imgur.com/Xm9eIhz.gif)

### Admin dashboard + texting service demo
---
[Full video link](https://drive.google.com/open?id=1bVG1KUow_Jj-e8q2gajalak0KkCUNhJ1)  
![Admin dashboard + texting service demo GIF](https://i.imgur.com/VcAlLch.gif)

## Project requirements
---
This project requires `npm`. Upon downloading, please install the requirements by running `npm install` in the root folder. You should also `cd` into the `client` folder and run `npm install` there as well.

This project uses the MERN stack: Node.js + Express on the backend with a MongoDB database and frontend in ReactJS. Because it is an SMS based app, we use the Twilio API to manage receiving/sending texts. To run it on your own, you'll need to create an account on Twilio, create a number, and set the incoming SMS webhook to your local server.

## Server-side
The server-side app runs on Node.js with a MongoDB database. Run `node server.js` in the root folder to get the server up and running.

## Front-end
The front-end admin dashboard is in ReactJS. `cd` to the `client` folder and run `npm start` to initialize the client. If in WSL, run `BROWSER=none yarn start` instead (on my computer, adding this suffix removed an error with opening Google chrome).

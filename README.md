# reembrace
This is the open-source repository for our team's submission to the 2019 SIG/SIEPR Policy Hackathon. "reembrace" is the codename for our policy proposal, which is a play on words on the term "reentry" and the term "wraparound services." Wrap-around services have actaully been shown to be _harmful_ in that they can lead to increased recidivism rates (Doleac 2019). One hypothesis for why wraparound services impact people released from prison in a negative manner is that they overwhelm and frustrate subjects with constant check-ins and mandatory appointments, creating obligations and furthering resentment toward the system.

We envision a better version of wraparound services that we term an "reembrace" into society. Rather than forcing people who are reentering society into a suite of programs they may not want or need, we create an accessible text service that centers around the released person and provides them with choices to pursue whatever resources they desire, at the tips of their fingerips.

## Project requirements
This project requires `npm`. Upon downloading, please install the requirements by running `npm install` in the root folder.

## Server-side
The server-side app runs on Node.js with a MongoDB database. Run "node server.js" in the root folder to get the server up and running.

## Front-end
The front-end admin dashboard is in ReactJS. `cd` to the client folder and run `yarn start` to initialize the client. If in WSL, run `BROWSER=none yarn start` instead.

const User = require('../models').User;
const UserInput = require('../models').UserInput;
const FitnessSubgym = require('../models').FitnessSubgym;
const BasketballSubgym = require('../models').BasketballSubgym;
const PoolSubgym = require('../models').PoolSubgym;
const TrackSubgym = require('../models').TrackSubgym;

const fs = require('fs');
const mkdirp = require('mkdirp');
const readline = require('readline');
const {google} = require('googleapis');
const OAuth2Client = google.auth.OAuth2;
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
const TOKEN_PATH = 'credentials.json';

module.exports = {
  create(req, res) {
    return User
      .create({
        title: req.body.title,
      })
      .then(user => res.status(201).send(user))
      .catch(err => {
    console.error("Post request error", err);
  });
  },
  list(req, res) {
  return User
    .findAll({
    	include: [{
    		model: UserInput,
    		as: 'userInputs'
    	}, {
        model: FitnessSubgym,
        as: 'fitnessSubgyms',
      },{
        model: BasketballSubgym,
        as: 'basketballSubgyms',
      },{
        model: PoolSubgym,
        as: 'poolSubgyms',
      },{
        model: TrackSubgym,
        as: 'trackSubgyms',
      }]
    })
    .then(users => res.status(200).send(users))
    .catch(error => res.status(400).send(error));
},
retrieve(req, res) {
  return User
    .findById(req.params.userId, {
      include: [{
        model: UserInput,
        as: 'userInputs',
      },{
        model: FitnessSubgym,
        as: 'fitnessSubgyms',
      },{
        model: BasketballSubgym,
        as: 'basketballSubgyms',
      },{
        model: PoolSubgym,
        as: 'poolSubgyms',
      },{
        model: TrackSubgym,
        as: 'trackSubgyms',
      }]
    })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: 'User Not Found',
        });
      }
      return res.status(200).send(user);
    })
    .catch(error => res.status(400).send(error));
},
// getCalendar() {
//   fs.readFile('client_secret.json', (err, content) => {
//   if (err) return console.log('Error loading client secret file:', err);
//   // Authorize a client with credentials, then call the Google Drive API.
// //   authorize(JSON.parse(content), listEvents);
//   });
//   const {client_secret, client_id, redirect_uris} = JSON.parse(content).installed;
//   const oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);
//   console.log('2');
//   // Check if we have previously stored a token.
//   fs.readFile(TOKEN_PATH, (err, token) => {
//     if (err) 
//       return console.log('annen girsin gotune', err);
//       // return getAccessToken(oAuth2Client, callback);
//     // oAuth2Client.setCredentials(JSON.parse(token));
//     // callback(oAuth2Client);

//   });
//   const calendar = google.calendar({version: 'v3', auth});
//   calendar.events.list({
//     calendarId: 'primary',
//     timeMin: (new Date()).toISOString(),
//     maxResults: 10,
//     singleEvents: true,
//     orderBy: 'startTime',
//   }, (err, {data}) => {
//     if (err) return console.log('The API returned an error: ' + err);
//     const events = data.items;
//     if (events.length) {
//       console.log('Upcoming 10 events:');
//       events.map((event, i) => {
//         const start = event.start.dateTime || event.start.date;
//         return (`${start}`); 
//         // - ${event.summary}`);
//       });
//     } else {
//       return('No upcoming events found.');
//     }
// });
// },
update(req, res) {
  return User
    .findById(req.params.userId, {
      include: [{
        model: UserInput,
        as: 'userInputs',
      }],
    })
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: 'User Not Found',
        });
      }
      return user
        .update({
          title: req.body.title || user.title,
        })
        .then(() => res.status(200).send(user))  // Send back the updated user.
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
},
destroy(req, res) {
  return User
    .findById(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(400).send({
          message: 'User Not Found',
        });
      }
      return user
        .destroy()
        .then(() => res.status(204).send())
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
},
};
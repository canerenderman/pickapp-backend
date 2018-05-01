const usersController = require('../controllers').users;
const userInputsController = require('../controllers').userInputs;
const fitnessSubgymsController = require('../controllers').fitnessSubgyms;
const basketballSubgymsController = require('../controllers').basketballSubgyms;
const poolSubgymsController = require('../controllers').poolSubgyms;
const trackSubgymsController = require('../controllers').trackSubgyms;
const locationsController = require('../controllers').locations;
const facilitiesController = require('../controllers').facilities;

const fs = require('fs');
const mkdirp = require('mkdirp');
const readline = require('readline');
const {google} = require('googleapis');
const OAuth2Client = google.auth.OAuth2;
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
const TOKEN_PATH = 'credentials.json';
const TOKEN_PATH1 = 'client_secret.json';

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'MAL MURAT!',
  }));

  app.post('/api/users', usersController.create);
  app.get('/api/users', usersController.list);
  app.get('/api/users/:userId', usersController.retrieve);
  app.put('/api/users/:userId', usersController.update);
  app.delete('/api/users/:userId', usersController.destroy);

   app.post('/api/locations/:locationId/facility', facilitiesController.create);
  app.get('/api/locations/:locationId/facility', facilitiesController.retrieve);
  app.put('/api/locations/:locationId/facility/:facilityId', facilitiesController.update);
  app.delete(
    '/api/locations/:locationId/facility/:facilityId', facilitiesController.destroy);
  

  app.post('/api/locations', locationsController.create);
  app.get('/api/locations', locationsController.list);
  app.get('/api/locations/:locationId', locationsController.retrieve);
  app.put('/api/locations/:locationId', locationsController.update);
  app.delete('/api/locations/:locationId', locationsController.destroy);

  app.get('/api/calendar/pool', function(req, res){
    // Load client secrets from a local file.
      content = {"installed":{"client_id":"877505415580-oikl39a5j38ff615rtpiejp1c00dsfok.apps.googleusercontent.com","project_id":"iconic-access-200414","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://accounts.google.com/o/oauth2/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"UbJfTp7zh41KTIVKeO6fNhzi","redirect_uris":["urn:ietf:wg:oauth:2.0:oob","http://localhost"]}}
      // Authorize a client with credentials, then call the Google Drive API.
      authorize(content, listEvents);
      /**
       * Create an OAuth2 client with the given credentials, and then execute the
       * given callback function.
       * @param {Object} credentials The authorization client credentials.
       * @param {function} callback The callback to call with the authorized client.
       */
      function authorize(credentials, callback) {
        const {client_secret, client_id, redirect_uris} = credentials.installed;
        const oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);
        token = {"access_token":"ya29.GluWBbm1vW71sU9c5sZZykHjP6BEU5f1Pi8QgmD6wF6-LqEp3r1CNm1EGDFuZXAlCWgHFU1QxMJXpkjS-nlVNt4Q3CnDSSwX5t-mK1u5GxRRHZvME_2j5JMOh89m","token_type":"Bearer","refresh_token":"1/VwUGBtwuQuuJ8Ciqt8foZj2grSQd4VutrTX0ZbeTyac","expiry_date":1523116433466}
          oAuth2Client.setCredentials(token);
          callback(oAuth2Client);
      }
      /**
       * Lists the next 10 events on the user's primary calendar.
       * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
       */
      function listEvents(auth) {
        const calendar = google.calendar({version: 'v3', auth});
        calendar.events.list({
          calendarId: 'brown.edu_rq0vojk0egcume8mkpbikruhjg@group.calendar.google.com',
          timeMin: (new Date()).toISOString(),
          maxResults: 30,
          singleEvents: true,
          orderBy: 'startTime',
          timeZone: 'America/New_York'
        }, (err, {data}) => {
          if (err) return console.log('The API returned an error: ' + err);
          const events = data.items;
          if (events.length) {
            console.log('Upcoming 30 events:');
            events_send = [];
            events_send = events.map((event, i) => {
              const start = event.start.dateTime || event.start.date;
              const end = event.end.dateTime || even.end.date;
              // const location = event.location;
              return(`${start} - ${end} - ${event.summary}`)
            });
            res.send(events_send);
          } else {
            res.send('No upcoming events found.');
          }
        });
      }
  });
  app.get('/api/calendar/basketball', function(req, res){
    // Load client secrets from a local file.
      content = {"installed":{"client_id":"877505415580-oikl39a5j38ff615rtpiejp1c00dsfok.apps.googleusercontent.com","project_id":"iconic-access-200414","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://accounts.google.com/o/oauth2/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"UbJfTp7zh41KTIVKeO6fNhzi","redirect_uris":["urn:ietf:wg:oauth:2.0:oob","http://localhost"]}}
      // Authorize a client with credentials, then call the Google Drive API.
      authorize(content, listEvents);
      /**
       * Create an OAuth2 client with the given credentials, and then execute the
       * given callback function.
       * @param {Object} credentials The authorization client credentials.
       * @param {function} callback The callback to call with the authorized client.
       */
      function authorize(credentials, callback) {
        const {client_secret, client_id, redirect_uris} = credentials.installed;
        const oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);
        token = {"access_token":"ya29.GluWBbm1vW71sU9c5sZZykHjP6BEU5f1Pi8QgmD6wF6-LqEp3r1CNm1EGDFuZXAlCWgHFU1QxMJXpkjS-nlVNt4Q3CnDSSwX5t-mK1u5GxRRHZvME_2j5JMOh89m","token_type":"Bearer","refresh_token":"1/VwUGBtwuQuuJ8Ciqt8foZj2grSQd4VutrTX0ZbeTyac","expiry_date":1523116433466}
          oAuth2Client.setCredentials(token);
          callback(oAuth2Client);
      }
      /**
       * Lists the next 10 events on the user's primary calendar.
       * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
       */
      function listEvents(auth) {
        const calendar = google.calendar({version: 'v3', auth});
        calendar.events.list({
          calendarId: 'qpn1bs5n6ce7smn3k9vg3d88vs@group.calendar.google.com',//'brown.edu_jk2qbab4b5msqg5o06bsv97arg@group.calendar.google.com',
          timeMin: (new Date()).toISOString(),
          maxResults: 30,
          singleEvents: true,
          orderBy: 'startTime',
          timeZone: 'America/New_York'
        }, (err, {data}) => {
          if (err) return console.log('The API returned an error: ' + err);
          const events = data.items;
          if (events.length) {
            console.log('Upcoming 30 events:');
            events_send = [];
            events_send = events.map((event, i) => {
              const start = event.start.dateTime || event.start.date;
              const end = event.end.dateTime || even.end.date;
              const location = event.location
              const description = event.description
              return(`${start} - ${end}-${event.summary}-${location}-${description}`)
            });
            res.send(events_send);
          } else {
            res.send('No upcoming events found.');
          }
        });
      }
  });
  app.get('/api/calendar/nelson', function(req, res){
    // Load client secrets from a local file.
      content = {"installed":{"client_id":"877505415580-oikl39a5j38ff615rtpiejp1c00dsfok.apps.googleusercontent.com","project_id":"iconic-access-200414","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://accounts.google.com/o/oauth2/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"UbJfTp7zh41KTIVKeO6fNhzi","redirect_uris":["urn:ietf:wg:oauth:2.0:oob","http://localhost"]}}
      // Authorize a client with credentials, then call the Google Drive API.
      authorize(content, listEvents);
      /**
       * Create an OAuth2 client with the given credentials, and then execute the
       * given callback function.
       * @param {Object} credentials The authorization client credentials.
       * @param {function} callback The callback to call with the authorized client.
       */
      function authorize(credentials, callback) {
        const {client_secret, client_id, redirect_uris} = credentials.installed;
        const oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);
        token = {"access_token":"ya29.GluWBbm1vW71sU9c5sZZykHjP6BEU5f1Pi8QgmD6wF6-LqEp3r1CNm1EGDFuZXAlCWgHFU1QxMJXpkjS-nlVNt4Q3CnDSSwX5t-mK1u5GxRRHZvME_2j5JMOh89m","token_type":"Bearer","refresh_token":"1/VwUGBtwuQuuJ8Ciqt8foZj2grSQd4VutrTX0ZbeTyac","expiry_date":1523116433466}
          oAuth2Client.setCredentials(token);
          callback(oAuth2Client);
      }
      /**
       * Lists the next 10 events on the user's primary calendar.
       * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
       */
      function listEvents(auth) {
        const calendar = google.calendar({version: 'v3', auth});
        calendar.events.list({
          calendarId: '90ik3tv8cd1ia4uja4j926m7hs@group.calendar.google.com',//'brown.edu_7vo0v32566duu5fr3sllg2nt1k@group.calendar.google.com',
          timeMin: (new Date()).toISOString(),
          maxResults: 30,
          singleEvents: true,
          orderBy: 'startTime',
          timeZone: 'America/New_York'
        }, (err, {data}) => {
          if (err) return console.log('The API returned an error: ' + err);
          const events = data.items;
          if (events.length) {
            console.log('Upcoming 30 events:');
            events_send = [];
            events_send = events.map((event, i) => {
              const start = event.start.dateTime || event.start.date;
              const end = event.end.dateTime || even.end.date;
              return(`${start} - ${end} - ${event.summary}`)
            });
            res.send(events_send);
          } else {
            res.send('No upcoming events found.');
          }
        });
      }
  });
  app.get('/api/calendar/omac', function(req, res){
    // Load client secrets from a local file.
      content = {"installed":{"client_id":"877505415580-oikl39a5j38ff615rtpiejp1c00dsfok.apps.googleusercontent.com","project_id":"iconic-access-200414","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://accounts.google.com/o/oauth2/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"UbJfTp7zh41KTIVKeO6fNhzi","redirect_uris":["urn:ietf:wg:oauth:2.0:oob","http://localhost"]}}
      // Authorize a client with credentials, then call the Google Drive API.
      authorize(content, listEvents);
      /**
       * Create an OAuth2 client with the given credentials, and then execute the
       * given callback function.
       * @param {Object} credentials The authorization client credentials.
       * @param {function} callback The callback to call with the authorized client.
       */
      function authorize(credentials, callback) {
        const {client_secret, client_id, redirect_uris} = credentials.installed;
        const oAuth2Client = new OAuth2Client(client_id, client_secret, redirect_uris[0]);
        token = {"access_token":"ya29.GluWBbm1vW71sU9c5sZZykHjP6BEU5f1Pi8QgmD6wF6-LqEp3r1CNm1EGDFuZXAlCWgHFU1QxMJXpkjS-nlVNt4Q3CnDSSwX5t-mK1u5GxRRHZvME_2j5JMOh89m","token_type":"Bearer","refresh_token":"1/VwUGBtwuQuuJ8Ciqt8foZj2grSQd4VutrTX0ZbeTyac","expiry_date":1523116433466}
          oAuth2Client.setCredentials(token);
          callback(oAuth2Client);
      }
      /**
       * Lists the next 10 events on the user's primary calendar.
       * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
       */
      function listEvents(auth) {
        const calendar = google.calendar({version: 'v3', auth});
        calendar.events.list({
          calendarId: 'p0f761qkng4hepnv361dbuekmg@group.calendar.google.com',//'brown.edu_7vo0v32566duu5fr3sllg2nt1k@group.calendar.google.com',
          timeMin: (new Date()).toISOString(),
          maxResults: 30,
          singleEvents: true,
          orderBy: 'startTime',
          timeZone: 'America/New_York'
        }, (err, {data}) => {
          if (err) return console.log('The API returned an error: ' + err);
          const events = data.items;
          if (events.length) {
            console.log('Upcoming 30 events:');
            events_send = [];
            events_send = events.map((event, i) => {
              const start = event.start.dateTime || event.start.date;
              const end = event.end.dateTime || even.end.date;
              return(`${start} - ${end} - ${event.summary}`)
            });
            res.send(events_send);
          } else {
            res.send('No upcoming events found.');
          }
        });
      }
  });

  app.post('/api/users/:userId/inputs', userInputsController.create);
  app.put('/api/users/:userId/inputs/:userInputId', userInputsController.update);
  app.delete(
    '/api/users/:userId/inputs/:userInputId', userInputsController.destroy);

  app.post('/api/users/:userId/fitness', fitnessSubgymsController.create);
  app.get('/api/users/:userId/fitness', fitnessSubgymsController.retrieve);
  app.get('/api/users/:userId/fitness1', fitnessSubgymsController.retrieve1);
  app.put('/api/users/:userId/fitness/:fitnessId', fitnessSubgymsController.update);
  app.delete(
    '/api/users/:userId/fitness/:fitnessId', fitnessSubgymsController.destroy);
  
  app.post('/api/users/:userId/basketball', basketballSubgymsController.create);
  app.get('/api/users/:userId/basketball', basketballSubgymsController.retrieve);
  app.put('/api/users/:userId/basketball/:basketballId', basketballSubgymsController.update);
  app.delete(
    '/api/users/:userId/basketball/:basketballId', basketballSubgymsController.destroy);

  app.post('/api/users/:userId/pool', poolSubgymsController.create);
  app.get('/api/users/:userId/pool', poolSubgymsController.retrieve);
  app.put('/api/users/:userId/pool/:poolId', poolSubgymsController.update);
  app.delete(
    '/api/users/:userId/pool/:poolId', poolSubgymsController.destroy);

  app.post('/api/users/:userId/track', trackSubgymsController.create);
  app.get('/api/users/:userId/track', trackSubgymsController.retrieve);
  app.put('/api/users/:userId/track/:trackId', trackSubgymsController.update);
  app.delete(
    '/api/users/:userId/track/:trackId', trackSubgymsController.destroy);

  
// For any other request method on todo items, we're going to return "Method Not Allowed"
  app.all('/api/todos/:todoId/items', (req, res) =>
    res.status(405).send({
      message: 'Method Not Allowed',
  }));
};
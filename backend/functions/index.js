const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');
const app = express();
const routesConfig = require('./routes-config');

/**
 * setting firebase admin and firestore db
 * don't forget to set env var when on production stage:
 * $env:GOOGLE_APPLICATION_CREDENTIALS="D:\documents\javascript\code testing\my projects\mitranetra-cloud-functions\functions\mitranetra-1234-firebase-adminsdk-izyqz-dc403073b1.json"
 */

// set cors and body parser
app.use(cors({ origin: true }));
app.use(express.json());

// call routesConfig() function
// why not directly call for app.method()?
// because i need to pass db and auth as args and middleware functions into the app functions
// they are passed through the body of routesConfig()
// and also, it's easier to manage.
routesConfig(app);

// exports app to http function
exports.app = functions.https.onRequest(app);

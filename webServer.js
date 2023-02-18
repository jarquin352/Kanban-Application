'use strict';

/*
 * A simple Node.js program for exporting the current working directory via a webserver listing
 * on a hard code (see portno below) port. To start the webserver run the command:
 *    node webServer.js
 *
 * Note that anyone able to connect to localhost:3001 will be able to fetch any file accessible
 * to the current user in the current directory or any of its children.
 */

/* jshint node: true */

var express = require('express');
var portno = 3000;   // Port number to use
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const bodyParser = require('body-parser');
const session = require('express-session');
const config = require('dotenv').config();

var app = express();
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(
  session({ secret: config.parsed.SECRET_KEY, resave: false, saveUninitialized: false })
);

mongoose.connect(config.parsed.DB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("open", function () {
  console.log("DB connected successfully");
});

const apiRoutes = require('./routes/api.js');

app.use('/api', apiRoutes);


var server = app.listen(portno, function () {
  var port = server.address().port;
  console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
});

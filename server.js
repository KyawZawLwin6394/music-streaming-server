const express = require('express'),
app = express(),
config = require('./config/config');
const mongoose = require("mongoose");
const db = mongoose.connection;
require('./config/express')(app, config);

function errorHandler (error, request, response, next) {
  // Error handling middleware functionality
  console.log( `error ${error.message}`) // log the error
  const status = error.status || 400
  // send back an easily understandable error message to the caller
  response.status(status).send(error.message)
}

if (mongoose.connection.readyState != 1) {
  mongoose.Promise = global.Promise;
  mongoose.connect(config.db, config.mongooseSettings);

  const db = mongoose.connection;
  db.on('error', (err) => {
    throw new Error(`Unable to connect to database at ${config.db} err`);
  });

  db.once('open', function () {
    console.log('Database is connected');
  });
  module.exports = db;
}

mongoose.plugin((schema) => {
  schema.options.usePushEach = true;
});

app.use(errorHandler)
app.listen(config.port, (error) => {
  if (!error) console.log("Server is sucessfully running on Port: "+config.port);
});

module.exports = db;


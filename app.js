'use strict'

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var dotenv = require('dotenv');
dotenv.load();

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json())

//connect the database
DATABASE=process.env.DATABASE;
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://' + DATABASE, { useMongoClient: true });
console.log("Database connected");
console.log('mongodb://' + DATABASE);

//start server
app.listen(3000);

console.log("Server listening on port 3000");

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
'use strict';

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.load();
const orderModel = require('./models/order');
const pointModel = require('./models/point');
const vendorModel = require('./models/vendor');
const pointRoutes = require('./routes/point');
const orderRoutes = require('./routes/order');
const vendorRoutes = require('./routes/vendor');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Routes
app.use('/order', orderRoutes);
app.use('/point', pointRoutes);
app.use('/vendor', vendorRoutes);

//connect the database
const DATABASE=process.env.DATABASE;
//mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://'+ DATABASE);
console.log("Database connected");
//console.log('mongodb://' + DATABASE);



//start server
app.listen(3000);

console.log("Server listening on port 3000");

// error handler
/*app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/
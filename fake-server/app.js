const bignum = require ('bignum');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const limitUp = bignum(2).pow(bignum(128))
const limitDown = bignum(2).pow(bignum(127));

app.get('/id', function (req, res) {

	const id = (limitDown.rand(limitUp)).toString(16);
	res.status(200).send({id:id})

});


app.listen(3003);
console.log("Server listeneing on port 3003");
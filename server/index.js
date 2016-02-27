'use strict'
var Measurement = require('./src/models/measurement');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var path = require('path');

app.use((req,res,next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
})
app.get('/sign_s3', require('./src/amazon'));
app.use((req, res) => {
  res.status(401).send('Unauthorized!');
});
server.listen(1337);

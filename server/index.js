'use strict'
var Measurement = require('./src/models/measurement');
var express = require('express');
var compression = require('compression');
var cors = require('cors');
var app = express();
var server = require('http').Server(app);
var path = require('path');



app.use(cors());
// gzip
app.use(compression());
//Allow S3 signing
app.get('/sign_s3', require('./src/amazon'));

var root = path.resolve(__dirname + '/../build/');
app.use(express.static(root));

app.use('*', function(req, res) {
  res.redirect('/');
})



server.listen(1337);

'use strict'
var express = require('express');
var compression = require('compression');
var cors = require('cors');
var app = express();
var server = require('http').Server(app);
var path = require('path');



app.use(cors());
// gzip
app.get('/api/sign_s3', require('./src/amazon'));
app.get('/api/greet', function(req, res) {
  res.send('Hello!');
})
server.listen(1337);

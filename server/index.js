'use strict'
var Measurement = require('./src/models/measurement');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var tSocket = require('./src/tSocket');
var path = require('path');
var MeasurementService = require('./src/services/measurement');
var Mongoose = require('mongoose');
tSocket.init(server);

Mongoose.connect('mongodb://localhost:27017/peltiassat', function() {
//   Mongoose.connection.db.dropDatabase();
});
var db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
  console.log("Connection with database succeeded.");
});

var measurement = new Measurement()
measurement.category1.correct = 5;
measurement.category1.defects.push(
  {
    defect: 'Test defect',
    responsible: 'I am',
    misc: 'Nothing special',
    image: 'No image'
  }
)
measurement.category2.correct = 3;
measurement.category3.correct = 2;
measurement.save()
.then((measurement) => {
  console.log('Save succesfull')
}, (err) => {
  console.log('Save failed ' + err)
})

server.listen(8080);
require('./src/routes/socketdispatcher');




app.get('/sign_s3', require('./src/amazon'));
app.use(express.static(path.join(__dirname, '../build')));
app.use((req, res) => {
  res.redirect('/');
});

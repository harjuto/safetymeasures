'use strict';
var actions = require('../../../shared/actions');
var io = require('../tSocket').getIo();
var MeasurementService = require('../services/measurement');

io.on('connection', (socket) => {
  console.log('Client connected')
    MeasurementService.list()
    .then((list) => {
      socket.emit(actions.INITIALIZE, list);
    }, (err) => {
      console.log('Error fetching')
      socket.emit(actions.INITIALIZE, {});
    }
  )

  socket.on(actions.SUBMIT_REPORT, (measurement) => {
    console.log(measurement);
    MeasurementService.create(measurement)

  })

})

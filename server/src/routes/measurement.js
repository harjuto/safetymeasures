'use strict';
var router = require('express').Router();
var MeasurementService = require('../services/measurement');

router.route('/')

  // List
  .get((req, res) =>
    MeasurementService.list()
      .then((list) => {
        res.json(list)
      }, (err) => {
        res.sendStatus(400)
      })
  )

  // Create
  .post((req, res) =>
    MeasurementService.create(req.body)
      .then((habit) => {
        res.json(habit)
      }, (err) => {
        res.sendStatus(422)
      })
  );

module.exports = router;
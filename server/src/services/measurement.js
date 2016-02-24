'use strict';

var Measurement = require('../models/measurement');
var http = require('http');
var Q = require('q');

class MeasurementService {

  static list() {
    return Measurement.find();
  }

  static show(id) {
    return get(id);
  }

  static create(params) {
    return setParams(new Measurement(), params).save();
  }

  static update(id, params) {
    var deferred = Q.defer();
    get(id).then((measurement) => {
      if (!measurement) {
        deferred.reject();
      }
      setParams(measurement, params).save().then((measurement) => {
        deferred.resolve(measurement)
      }, (err) => {
        deferred.reject(err)
      })
    }, (err) => {
      deferred.reject(err)
    });

    return deferred.promise;
  }

  static delete(id) {
    var deferred = Q.defer();
    get(id).then((measurement) => {
      if (!measurement) {
        deferred.reject();
      }
      measurement.remove().then(() => {
        deferred.resolve()
      }, (err) => {
        deferred.reject(err)
      })
    }, (err) => {
      deferred.reject(err)
    });

    return deferred.promise
  }


}

module.exports = MeasurementService;

/*
 * Private utility functions
 */
function setParams(measurement, params) {
  measurement.date = params.date;

  measurement.category1.correct = params.category1.correct
  measurement.category1.defects = params.category1.defects

  measurement.category2.correct = params.category2.correct
  measurement.category2.defects = params.category2.defects

  measurement.category3.correct = params.category3.correct
  measurement.category3.defects = params.category3.defects
  console.log(measurement);
  return measurement
}
// category: {type: Number, default: 1},
// title: {type: String, default: "Työskentely"},
// correct: Number,
// defects: [
//   Defect
// ]

function get(id) {
  return measurement.findById(id);
}

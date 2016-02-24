
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Defect = require('./defect').schema;
var MeasurementSchema = new Schema({
  category1: {
    id: {type: Number, default: 1},
    title: {type: String, default: "Työskentely"},
    correct: Number,
    defects: [Defect]
  },
  category2: {
    id: {type: Number, default: 2},
    title: {type: String, default: "Telineet"},
    correct: Number,
    defects: [Defect]
  },
  category3: {
    id: {type: Number, default: 3},
    title: {type: String, default: "Koneet"},
    correct: Number,
    defects: [Defect]
  }

}, {timestamps: true});

module.exports = mongoose.model('Measurement', MeasurementSchema);

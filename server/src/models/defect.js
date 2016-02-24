
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DefectSchema = new Schema({
  defect: String,
  responsible: String,
  misc: String,
  image: String
}, {timestamps: true});

module.exports = mongoose.model('Defect', DefectSchema);
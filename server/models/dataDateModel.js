var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var dataDateSchema = new Schema({	'date' : String,	'point' : Number});

module.exports = mongoose.model('dataDate', dataDateSchema);

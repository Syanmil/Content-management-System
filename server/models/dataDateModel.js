var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var dataDateSchema = new Schema({

module.exports = mongoose.model('dataDate', dataDateSchema);
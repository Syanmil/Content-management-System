var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var dataSchema = new Schema({

module.exports = mongoose.model('data', dataSchema);
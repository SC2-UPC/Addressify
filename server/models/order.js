var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var pointModel = require('./point');
var Point = mongoose.model('Point');

var order = mongoose.Schema({
    IdO: { type: String, unique: true },
    IdPoint: { type: Schema.ObjectId, ref: 'Point' },
    kPub: { type: String },
    arrived: { type: Boolean, default: false },
    delivered: { type: Boolean, default: false }
}, { collection: 'orders' });

module.exports = mongoose.model('Order', order);
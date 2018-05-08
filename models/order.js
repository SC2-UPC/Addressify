var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var pointModel = require('./point');
var Point = mongoose.model('Point');

var order = mongoose.Schema({
    IdO = {type: String},
    IdPoint: {type:Schema.ObjectId, ref: 'Point'},
    kPub: { type : String },
    arrived: {type:Boolean,required : false},
	delivered: {type:Boolean,required : false}
},{collection:'orders'});

module.exports=mongoose.model('Order', order);
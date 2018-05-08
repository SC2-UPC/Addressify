var mongoose = require('mongoose');

var point= mongoose.Schema({
    name: { type : String },
    province: { type : String },
    city: {type: String},
    postCode: {type: Number},
    address: {type: String},
    kpub: {type: String},
    kpriv: {type : String},
    email: {type:String},
    phone:{type:Number},
    password: {type:String}
},{collection:'points'});

module.exports=mongoose.model('Point', point);
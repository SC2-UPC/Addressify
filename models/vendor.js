var mongoose = require('mongoose');

var vendor= mongoose.Schema({
    name: { type : String },
    kpub: {type: String},
    kpriv: {type : String},
    email: {type:String},
    phone:{type:Number},
    password: {type:String}
},{collection:'points'});

module.exports=mongoose.model('Vendor', vendor);
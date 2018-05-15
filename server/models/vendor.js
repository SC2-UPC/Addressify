var mongoose = require('mongoose');

var vendor= mongoose.Schema({
    name: { type : String },
    email: {type:String, unique : true},
    phone:{type:Number},
    password: {type:String},
    kpub: {type: String},
    kpriv: {type : String}
},{collection:'vendors'});

module.exports=mongoose.model('Vendor', vendor);
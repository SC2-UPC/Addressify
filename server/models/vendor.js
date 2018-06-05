var mongoose = require('mongoose');

var vendor= mongoose.Schema({
    name: { type : String, required:true},
    email: {type:String, unique : true, required:true},
    phone:{type:Number, required:true},
    password: {type:String, required:true},
    kpub: {},
    kpriv: {}
},{collection:'vendors'});

module.exports=mongoose.model('Vendor', vendor);
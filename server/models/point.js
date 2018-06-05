var mongoose = require('mongoose');

var point= mongoose.Schema({
    name: { type : String,required:true },
    province: { type : String,required:true },
    city: {type: String, required:true},
    postCode: {type: Number, required:true},
    address: {type: String, required:true},
    kpub: {},
    kpriv: {},
    email: {type:String, unique : true, required:true},
    phone:{type:Number},
    password: {type:String}
},{collection:'points'});

module.exports=mongoose.model('Point', point);
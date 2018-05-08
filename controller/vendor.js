const mongoose = require('mongoose');
const Vendor = mongoose.model('Vendor');

exports.listAllVendors = function(req, res) {


    Vendor.find({}, function(err, vendors) {
        if (err)
            res.status(500).send({message: `Internal server error: ${err}`});
        else
            res.status(200).json(vendors);
    });
};

exports.listById = function(req, res){

};

exports.register = function(req, res){

};

exports.update = function(req, res){

};

exports.login = function(req, res){

};

exports.delete = function(req, res){

};
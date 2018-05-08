const mongoose = require('mongoose');
const Order = mongoose.model('Order');


exports.listAllOrders = function(req, res) {


    Order.find({}, function(err, users) {
        if (err)
            res.status(500).send({message: `Internal server error: ${err}`});
        else
            res.status(200).json(users);
    });
};

exports.listById = function(req, res){

};

exports.newOrder = function(req, res){

};

exports.arrived = function(req, res){

};

exports.delivered = function(req, res){

};

exports.delete = function(req, res){

};
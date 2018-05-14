const mongoose = require('mongoose');
const Order = mongoose.model('Order');


exports.listAllOrders = function (req, res) {


    Order.find({}, function (err, users) {
        if (err)
            res.status(500).send({ message: `Internal server error: ${err}` });
        else
            res.status(200).json(users);
    });
};

exports.findById = function (req, res) {
    res.status(200).json("ok");
};

exports.newOrder = function (req, res) {
    res.status(200).json("ok");
};

exports.arrived = function (req, res) {
    res.status(200).json("ok");
};

exports.delivered = function (req, res) {
    res.status(200).json("ok");
};

exports.delete = function (req, res) {
    res.status(200).json("ok");
};
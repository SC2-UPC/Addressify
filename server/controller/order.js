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
    const orderId = req.params.orderId;

    Order.find({ _id: orderId }, function (err, order) {
        if (err)
            res.status(500).send({ message: `Internal server error: ${err}` });
        else
            res.status(200).json(order);
    });
};

exports.newOrder = function (req, res) {
    const newOrder = new Order(req.body);

    newOrder.save(function (err, order) {
        if (err) {
            if (err.code == 11000)
                res.status(409).send({ message: `Object already exists` });
            else
                res.status(500).send({ message: `Internal server error: ${err}` });
        }
        else {
            res.status(200).json(order);
        }
    });
};

exports.arrived = function (req, res) {
    res.status(200).json("ok");
};

exports.delivered = function (req, res) {
    res.status(200).json("ok");
};

exports.delete = function (req, res) {
    const orderId = req.params.orderId;

    Order.findByIdAndRemove(orderId, function (err, order) {
        if (err)
            res.status(500).send({ message: `Internal server error: ${err}` });
        else
            res.status(200).json({ message: 'Object successfully deleted' });
    });
};
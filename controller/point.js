const mongoose = require('mongoose');
const Point = mongoose.model('Point');

exports.listAllPoints = function (req, res) {


    Point.find({}, function (err, points) {
        if (err)
            res.status(500).send({ message: `Internal server error: ${err}` });
        else
            res.status(200).json(points);
    });
};

exports.findById = function (req, res) {
    res.status(200).json("ok");
};

exports.register = function (req, res) {
    res.status(200).json("ok");
};

exports.update = function (req, res) {
    res.status(200).json("ok");
};

exports.login = function (req, res) {
    res.status(200).json("ok");
};

exports.delete = function (req, res) {
    res.status(200).json("ok");
};
const mongoose = require('mongoose');
const Point = mongoose.model('Point');

exports.listAllPoints = function(req, res) {


    Point.find({}, function(err, points) {
        if (err)
            res.status(500).send({message: `Internal server error: ${err}`});
        else
            res.status(200).json(points);
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
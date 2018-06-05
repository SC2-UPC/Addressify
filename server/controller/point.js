const mongoose = require('mongoose');
const Point = mongoose.model('Point');
const rsa = require ('rsa-cts2');

exports.listAllPoints = function (req, res) {
   Point.find({}, function (err, points) {
        if (err)
            res.status(500).send({ message: `Internal server error: ${err}` });
        else
            res.status(200).json(points);
    });
};

exports.findById = function (req, res) {
    const pointId = req.params.pointId;

    Point.find({ _id: pointId }, function (err, point) {
        if (err)
            res.status(500).send({ message: `Internal server error: ${err}` });
        else
            res.status(200).json(point);
    });
};

exports.findByProvince = function (req, res) {
    const province = req.params.province;

    Point.find({ province: province }, function (err, point) {
        if (err)
            res.status(500).send({ message: `Internal server error: ${err}` });
        else
            res.status(200).json(point);
    });
};

exports.login = function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    Point.findOne({ email: email }, function (err, point) {
        if (err) {
            res.status(500).send({ message: 'Internal server error' });
        } else {
            if (point) {
                /*bcrypt.compare(password,point.password, function(err, check){
                    if(check) {
                        res.status(200).json(point);

                    }else{
                        res.status(401).send({message: 'Incorrect credentials'});
                    }
                })*/
                if (password == point.password) {
                    res.status(200).send(point);

                } else {
                    res.status(401).send({ message: 'Incorrect credentials' });
                }
            } else {
                res.status(404).send({ message: 'Object not found' });
            }
        }
    });
};

exports.register = function (req, res) {
    const newPoint = new Point(req.body);
    const keys = rsa.getRSAKeys(512);
    newPoint.kpub = keys.publicKey;
    newPoint.kpriv = keys.privateKey;

    newPoint.save(function (err, point) {
        if (err) {
            if (err.code == 11000)
                res.status(409).send({ message: `Object already exists` });
            else
                res.status(500).send({ message: `Internal server error: ${err}` });
        }
        else {
            res.status(200).json(point);
        }
    });
};

exports.update = function (req, res) {
    const update = req.body;
    const pointId = req.params.pointId;

    Point.findByIdAndUpdate(pointId, update, { new: true }, function (err, point) {
        if (err) {
            res.status(500).send({ message: `Internal server error: ${err}` });
        }
        else
            res.status(200).json(point);
    });
};

exports.delete = function (req, res) {
    const pointId = req.params.pointId;

    Point.findByIdAndRemove(pointId, function (err, point) {
        if (err)
            res.status(500).send({ message: `Internal server error: ${err}` });
        else
            res.status(200).json({ message: 'Object successfully deleted' });
    });
};
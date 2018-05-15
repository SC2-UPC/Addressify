const mongoose = require('mongoose');
const Vendor = mongoose.model('Vendor');

exports.listAllVendors = function (req, res) {


    Vendor.find({}, function (err, vendors) {
        if (err)
            res.status(500).send({ message: `Internal server error: ${err}` });
        else
            res.status(200).json(vendors);
    });
};

exports.findById = function (req, res) {
    const vendorId = req.params.vendorId;

    Vendor.find({ _id: vendorId }, function (err, vendor) {
        if (err)
            res.status(500).send({ message: `Internal server error: ${err}` });
        else
            res.status(200).json(vendor);
    });
};

exports.login = function (req, res) {
    const email = req.body.email;
    const password = req.body.password;

    Vendor.findOne({ email: email }, function (err, vendor) {
        if (err) {
            res.status(500).send({ message: 'Internal server error' });
        } else {
            if (vendor) {
                /*bcrypt.compare(password,vendor.password, function(err, check){
                    if(check) {
                        res.status(200).json(vendor);

                    }else{
                        res.status(401).send({message: 'Incorrect credentials'});
                    }
                })*/
                if (password == vendor.password) {
                    res.status(200).send(vendor);

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
    const newVendor = new Vendor(req.body);
    newVendor.save(function (err, vendor) {
        if (err) {
            if (err.code == 11000)
                res.status(409).send({ message: `Object already exists` });
            else
                res.status(500).send({ message: `Internal server error: ${err}` });
        }
        else {
            res.status(200).json(vendor);
        }
    });
};

exports.update = function (req, res) {
    const update = req.body;
    const vendorId = req.params.vendorId;

    Vendor.findByIdAndUpdate(vendorId, update, { new: true }, function (err, vendor) {
        if (err) {
            res.status(500).send({ message: `Internal server error: ${err}` });
        }
        else
            res.status(200).json(vendor);
    });
};

exports.delete = function (req, res) {
    const vendorId = req.params.vendorId;

    Vendor.findByIdAndRemove(vendorId, function (err, vendor) {
        if (err)
            res.status(500).send({ message: `Internal server error: ${err}` });
        else
            res.status(200).json({ message: 'Object successfully deleted' });
    });
};
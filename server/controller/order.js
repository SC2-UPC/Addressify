const mongoose = require('mongoose');
const Order = mongoose.model('Order');
const Point = mongoose.model('Point');
const rsa = require('rsa-cts2')

const k = (process.env.kPriv).split(',')
const kk = { "d": k[0], "n": k[1] }
const key = rsa.privateKey(kk)
const ID = process.env.ID;

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
    const pubKey = rsa.publicKey(newOrder.kPub);
    delete newOrder.arrived;
    delete newOrder.delivered;

    newOrder.save(function (err, order) {
        if (err) {
            if (err.code == 11000)
                res.status(409).send({ message: `Object already exists` });
            else
                res.status(500).send({ message: `Internal server error: ${err}` });
        }
        else {
            const idO = order.IdO;
            const idP = order.IdPoint;
            const c = pubKey.encrypt(idO)
            const array = new Array(ID, idP, c);
            const concat = array.join(',');
            const po = key.generateProof(concat)

            let response = {};
            response.IDA = ID;
            response.IDP = idP;
            response.IDO = idO;
            response.C = c;
            response.PO = po;
            res.status(200).json(array);
        }
    });
};

exports.arrived = function (req, res) {
    const order = req.body;
    const idP = order.IDP;
    const idO = order.IDO;
    const c = order.C;
    const po = order.PO;

    Point.findById(idP)
        .exec(function (err, point) {
            if (err)
                res.status(500).send({ message: `Internal server error: ${err}` });
            else {
                const kP = rsa.publicKey(point.kpub)
                const array = new Array(ID, idP, c);
                const concat = array.join(',');
                const check = kP.checkProof(concat, po);
                if (check) {
                    Order.findOneAndUpdate({ IdO: idO }, { arrived: true }, { new: true })
                        .exec(function (err, order) {
                            if (err)
                                res.status(500).send({ message: `Internal server error: ${err}` });
                            else {
                                res.status(200).json({ message: 'Order arrived', order: order });
                            }
                        })
                }
                else
                    res.status(412).json({ message: 'Verification incorrect' });
            }
        });
};

exports.delivered = function (req, res) {
    const order = req.body;
    const idP = order.IDP;
    const idO = order.IDO;
    const c = order.C;
    const pe = order.PE;

    Order.findById(idO)
        .exec(function (err, order) {
            if (err)
                res.status(500).send({ message: `Internal server error: ${err}` });
            else {
                const kP = rsa.publicKey(order.kPub)
                const array = new Array(ID, idP, c);
                const concat = array.join(',');
                const check = kP.checkProof(concat, po);
                if (check) {
                    Order.findOneAndUpdate({ IdO: idO }, { delivered: true }, { new: true })
                        .exec(function (err, order) {
                            if (err)
                                res.status(500).send({ message: `Internal server error: ${err}` });
                            else {
                                res.status(200).json({ message: 'Order arrived', order: order });
                            }
                        })

                }
                else
                    res.status(412).json({ message: 'Verification incorrect' });
            }
        });

    /*Point.findById(idP)
        .exec(function (err, point) {
            if (err)
                res.status(500).send({ message: `Internal server error: ${err}` });
            else {
                const kP = rsa.publicKey(point.kpub)
                const array = new Array(ID, idP, c);
                const concat = array.join(',');
                const check = kP.checkProof(concat, po);
                if (check) {
                    Order.findOneAndUpdate({ IdO: idO }, { arrived: true }, { new: true })
                        .exec(function (err, order) {
                            if (err)
                                res.status(500).send({ message: `Internal server error: ${err}` });
                            else {
                                res.status(200).json({ message: 'Order arrived', order: order });
                            }
                        })

                }
                else
                    res.status(412).json({ message: 'Verification incorrect' });
            }
        });*/
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
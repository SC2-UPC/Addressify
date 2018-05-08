const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const order = require('../controllers/order');

//GET REQUESTS
//All the orders
router.get('/all', order.listAllOrders);
//By id
router.get('/:orderId', order.listById);


//POST REQUESTS
//New
router.post('/new', order.newOrder);


//UPDATE REQUESTS
//Arrived
router.post('/arrived', order.arrived);
//Delivered
router.post('/delivered', order.delivered);


//DELETE REQUESTS
//Order by id
router.delete('/:orderId', order.delete);


module.exports=router;
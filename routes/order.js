var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var products = require('../controllers/order');

//GET REQUESTS
//All the orders
router.get('/all',products.listAllProducts);
//By id
router.get('/byid',products.listAllProducts);

//POST REQUESTS
//New
router.post('/add', products.addProduct);


//UPDATE REQUESTS
//Arrived
router.post('/:productId', products.updateProduct);
//Delivered
router.post('/spec/:productId', products.addSpec);


//DELETE REQUESTS
//Order by id
router.delete('/:productId', products.deleteProduct);


module.exports=router;
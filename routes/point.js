var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var products = require('../controllers/order');

//GET REQUESTS
//All the point
router.get('/all',products.listAllProducts);
//By id
router.get('/byid',products.listAllProducts);

//POST REQUESTS
//New
router.post('/add', products.addProduct);
//Login
router.post('/login', products.addProduct);

//UPDATE REQUESTS
//Edit
router.post('/:productId', md_auth.ensureAuth, products.updateProduct);


//DELETE REQUESTS
//By id
router.delete('/:productId', md_auth.ensureAuth, products.deleteProduct);


module.exports=router;
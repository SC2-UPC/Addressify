const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const vendor = require('../controller/vendor');

//GET REQUESTS
//All the point
router.get('/all', vendor.listAllVendors);
//By id
router.get('/:vendorId', vendor.findById);

//POST REQUESTS
//New
router.post('/register', vendor.register);
//Login
router.post('/login', vendor.login);

//UPDATE REQUESTS
//Edit
router.post('/:vendorId', vendor.update);


//DELETE REQUESTS
//By id
router.delete('/:vendorId', vendor.delete);
 

module.exports=router;
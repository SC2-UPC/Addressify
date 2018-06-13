const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const point = require('../controller/point');

//GET REQUESTS
//All the point
router.get('/all', point.listAllPoints);
//By id
router.get('/:pointId', point.findById);
//find bt province
router.get('/province/:province', point.findByProvince);

//POST REQUESTS
//New
router.post('/register', point.register);
//Login
router.post('/login', point.login);

//UPDATE REQUESTS
//Edit
router.post('/:pointId', point.update);


//DELETE REQUESTS
//By id
router.delete('/:pointId', point.delete);


module.exports=router;
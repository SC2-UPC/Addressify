const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const order = require('../controllers/order');

//GET REQUESTS
//All the point
router.get('/all', point.listAllPoints);
//By id
router.get('/:pointId', point.listById);

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
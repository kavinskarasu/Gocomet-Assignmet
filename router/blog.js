const express=require('express');
const route=express.Router();
const authController=require('../controllers/login');
const controller=require('../controllers/blog')
route.get('/',controller.findAll)
route.get('/tag/:id',controller.findOne)
route.post('/',controller.create);
route.get('/:id',controller.findOne);
module.exports=route;
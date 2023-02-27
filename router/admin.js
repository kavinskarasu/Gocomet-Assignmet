const express=require('express');
const route=express.Router();
const authController=require('../controllers/login');
route.get("/",authController.findAdmin);
route.delete("/",authController.deleteAll);
route.delete("/:id",authController.delete);

module.exports=route;
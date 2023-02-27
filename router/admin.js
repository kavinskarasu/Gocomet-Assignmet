const express = require('express');
const Admin = require('../controllers/login');

const route = express.Router();
route.post("/", Admin.login);

module.exports=route;
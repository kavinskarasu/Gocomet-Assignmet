const express = require('express');
const Blogs = require('../controllers/blog')
const {  authCheck } = require('../controllers/login');

const route=express.Router();

route.get('/', Blogs.findAll);
route.post('/', authCheck, Blogs.create);
route.get('/tag/:id', Blogs.findByTag)
route.get('/:id', Blogs.findOne);
route.delete('/:id', Blogs.delete);

module.exports=route;
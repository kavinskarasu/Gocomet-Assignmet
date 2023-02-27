const express=require('express');
const blogs=require('./router/blog');
const admin=require('./router/admin');
const cors = require('cors');

const app=express();
app.use(express.json());
app.use(cors())
app.use('/blogs',blogs);
app.use('/admin',admin);

module.exports=app;
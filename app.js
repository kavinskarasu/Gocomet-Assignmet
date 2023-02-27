const express=require('express');
const app=express();
const cors = require('cors');
app.use(express.json());
app.use(cors())

const blogs=require('./router/blog');
const admin=require('./router/admin');
app.use(express.json());
app.use('/blogs',blogs);
app.use('/adminlogin',admin);

module.exports=app;
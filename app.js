
const express = require("express");
const blogs=require('./router/blog.router');
const admin=require('./router/admin.route')
app.use('/blogs',blogs);
app.use('/admin',admin);

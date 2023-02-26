// const express=require('express');
// const app=express();
// const dp=require('../Gocomet/model')
// const cors = require("cors");
// var corsOptions = {
//     origin: "http://localhost:8081"
//   };
//   app.use(cors(corsOptions));
//   app.use(express.urlencoded({ extended: true })); 
// dp.Sequelize.sync();
// const controller=require('./controllers/blog.controller')

// app.use(express.json());

// app.get('/',controller.findAll);
// app.listen(3000,()=>{
//     console.log("Server is running on Port 3000")
// })

const express = require("express");
const app = express();
const db = require("./model");
const controller=require('./controllers/blog.controller')
app.use(express.json());
db.sequelize.sync();
app.get('/',controller.findAll)
app.post('/blogs',controller.create);
app.get('/:id',controller.findOne);
app.delete("/:id",controller.delete);
app.delete("/",controller.deleteAll);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

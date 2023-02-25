const { json } = require('body-parser');
const express=require('express');
const CircularJSON = require('circular-json');

const client=require('./Database.js')
const app=express();
app.use(express.json());


//getting only a particular record
app.get("/blog/:id",async(req,res)=>{
    try{
   let query=(`SELECT * FROM blog where id=${req.params.id}`);
  
   client.query(query,(err,res)=>{
    
    const obj=CircularJSON.stringify(res.rows);
    console.log(obj)
})
    }catch(err){
        res.send(err);
    }

})

//geeting all records
app.get("/blogs",async(req,res)=>{
    client.query(`select * from blog`,(err,res)=>{
        console.log(res.rows);
    })
    res.send("j");
})




app.post("/blogs",async(req,res)=>{
   
    const query = `INSERT INTO blog(id, title, author, summary) VALUES(${req.body.id},'${req.body.Title}','${req.body.Author}','${req.body.Summary}')`;

   
    client.query(query,(err,res)=>{
        console.log(err,res);
        client.end();
    })
    res.send("posted")
   
})

app.listen(3000,()=>{
    console.log("Server is running on Port 3000")
})







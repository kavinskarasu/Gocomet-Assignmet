const { json } = require('body-parser');
const express=require('express');
const CircularJSON = require('circular-json');

const client=require('./Database.js')
const app=express();
app.use(express.json());


//getting only a particular record
app.get("/blog/:id",async(req,result)=>{
    
   let query=(`SELECT * FROM blog where id=${req.params.id}`);
  
   client.query(query,(err,res)=>{
    const obj=res.rows
    result.status(200).json({
        status:"success",
        data:{
            obj
        }
    })
})
    

})

//geeting all records
app.get("/blogs",async(req,result)=>{
    client.query(`select * from blog`,(err,res)=>{
      
        const obj=res.rows;
        result.status(200).json({
            status:"success",
            data:{
                obj
            }
        })
    })

})




app.post("/blogs",async(req,result)=>{
   
    const query = `INSERT INTO blog(id, title, author, summary) VALUES(${req.body.id},'${req.body.Title}','${req.body.Author}','${req.body.Summary}')`;

   
    client.query(query,(err,res)=>{
        console.log(err,res);
        client.end();
    })
    result.status(200).json({
        status:"success",
        data:"Posted"
    })
   
})

app.listen(3000,()=>{
    console.log("Server is running on Port 3000")
})







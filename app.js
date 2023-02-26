
const express=require('express');
const client=require('./Database.js')
const app=express();
app.use(express.json());
const axios=require('axios');
const cheerio=require('cheerio')
const getBlogs=require('./webScraping');

//getting only a particular record
app.get("/blog/:id",async(req,result)=>{
   try{
   let query=(`SELECT * FROM blog where id=${req.params.id}`);
   console.log(req.params.id)
   client.query(query,(err,res)=>{
    console.log(err)
    let obj;
   if(res==undefined) obj="Not found"
   else obj=res.rows;
    result.status(200).json({
        status:"success",
        data:{
            obj
        }
    })
})
   }catch(err){
    res.status(500).json({
        status:"failure",
        err
    })
   }
    

})

//geeting all records
app.get("/blogs",async(req,result)=>{
    try{
      
    client.query(`select * from blog`,(err,res)=>{
      
        const obj=res.rows;
        console.log(obj)
        result.status(200).json({
            status:"success",
            data:{
                obj
            }
        })
    })
    }catch(err){
        res.send(500).json({
            status:"failure",
            data:err
        })
    }
})




app.post("/blogs",async(req,result)=>{
   
   
    const url=req.body.url;
    const data=await(getBlogs(url));
    
    if(data==undefined) return result.status(500).json({
     status:"failure",
     data:"someting went worng please try again"
    })
    var fields = url.split('/');
    id=fields[4];
    author=data.author;
    title=data.title;
    tag=data.tag;
    time=data.time;
    summary=data.summary;
    
  
  const query = 'INSERT INTO blog(id, title, author, summary,tag,time) VALUES($1, $2, $3, $4, $5, $6)';
  const values = [id, title, author, summary, tag, time];
  
  client.query(query, values, (err, res) => {
    if(err){
        result.status(200).json({
            status:"success",
            data:err
        })
    }
    else{
        result.status(200).json({
            status:"success",
            data:"Posted"
        })
    }
  });
   
    
   
})




app.listen(3000,()=>{
    console.log("Server is running on Port 3000")
})







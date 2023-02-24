const express=require('express');

const app=express();
app.use(express.json());
let blogs=[];

//getting only a particular record
app.get("/user/:id",async(req,res)=>{
   
  let obj = blogs.find(o => o.id === req.params.id);
  console.log(obj);
  if(obj==undefined) res.send("No such id");
  else
  res.send(obj)

})

//geeting all records
app.get("/allBlogs",async(req,res)=>{
    res.send(blogs);
})




app.post("/postBlog",async(req,res)=>{
    console.log(req.body);
    blogs.push(req.body);
    res.send("posted")
    console.log(blogs);
})


app.listen(3000,()=>{
    console.log("Server is running on Port 3000")
})








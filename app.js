

const getBlogs=require('./webScraping');
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv').config()
const dp=require('./models')
//getting only a particular record
app.get("/blog/:id",async(req,result)=>{
   try{
    let query=(`SELECT * FROM blog where id='${req.params.id}'`);

  
   client.query(query,(err,res)=>{
   
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

app.get('/blogs/:getbycategories',(req,result)=>{
    try{
      
        let query=(`SELECT * FROM blog where tag='${req.params.getbycategories}'`);
    
       client.query(query,(err,res)=>{
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
        result.status(500).json({
            status:"failure",
            err
        })
       }
        
})



app.post("/blogs",verifyToken,async(req,result)=>{
   
   
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



app.post('/adminlogin',(req,result)=>{
    const userName=req.body.username;
    const password=req.body.password;
   
    const query = 'SELECT * FROM admin WHERE username=$1 AND password=$2';
    const values = [userName, password];
     client.query(query,values,(err,res)=>{
        const data=res.rows;
        if(err){
            
            result.status(500).json({
                status:"failure",
                data:"Something went worng",
                err
            })
     
        }
        else if(data.length==0){
            result.status(401).json({
                status:"failure",
                data:"Please provide correct credentials"
            })
        }
        jwt.sign({userName,password},process.env.ACCESS_TOKEN,(err,token)=>{
            result.json({
                token
            })
        })
     })
    

})

function verifyToken(req,result,next){
    const bearerHeader=req.headers['authorization'];
    if(typeof bearerHeader!=='undefined'){
        const bearer=bearerHeader.split(' ')[1];
        jwt.verify(bearer,process.env.ACCESS_TOKEN,(err,res)=>{
           
            if(typeof res!='undefined'){
             
                next();
            }
            else{
                result.status(403).json({
                    status:"failure",
                    data:"unauthorized"
                })
            }
        })
    
       
    }else{
        result.status(403).json({
            status:"failure",
            data:"unauthorized"
        })
    }
    
}
dp.sequelize.sync().then((req)=>{


});





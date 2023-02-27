const db=require('../model');
const admin=db.admin;
const Op=db.Sequelize.Op;
const dotenv=require('dotenv').config()
const jwt=require('jsonwebtoken');
const app = require('../app');
exports.login=(req,res)=>{
    const username=req.body.username;
    admin.findByPk(username)
    .then(data => {
      if (data) {
        if(data.password==req.body.password){
            const credentials=data.password;
            jwt.sign({username,credentials},process.env.ACCESS_TOKEN,(err,token)=>{
              if(err){
                console.log(err)
              }
                res.send(token)
            })
        }
      } else {
        res.status(404).send({
        message: `Admin can only access`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error  Please try again"
      });
    });

}


exports.authCheck=(req,result,next) => {
  const bearerHeader=req.headers['authorization'];
  console.log(req.headers)
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





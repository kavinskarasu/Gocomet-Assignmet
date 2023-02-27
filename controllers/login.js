const db=require('../model');
const admin=db.admin;
const blog=db.blog;
const Op=db.Sequelize.Op;
const dotenv=require('dotenv').config()
const jwt=require('jsonwebtoken');
const app = require('../app');
exports.findAdmin=(req,res)=>{
    const username=req.body.username;
   
    admin.findByPk(username)
    .then(data => {
      console.log(data)
      if (data) {
        console.log(username);
        if(data.password==req.body.password){
            const credentials=data.password;
           
            jwt.sign({username,credentials},process.env.ACCESS_TOKEN,(err,token)=>{
                result.json({
                    token
                })
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



// Delete a Blog with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  blog.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Blogs was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Blogs with id=${id}. Maybe Blog was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Blogs with id=" + id
      });
    });
};

// Delete all Blogs from the database.
exports.deleteAll = (req, res) => {
  blog.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Blogs were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Blogs."
      });
    });
};









 exports.verify=function verifyToken(req,result,next){
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





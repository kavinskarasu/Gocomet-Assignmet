const db=require('../model');
const blog=db.blog;
const Op=db.Sequelize.Op;
const scrape=require('../webScraping');

exports.create = async(req, res) => {
    // Validate request
    console.log(req.body.url);
    if (!req.body.url) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  const url=req.body.url;
   const data=await(scrape(url));
    
   if(data==undefined) return result.status(500).json({
    status:"failure",
    data:"someting went worng please try again"
   })
   var fields = url.split('/');
    const content = {
      id: fields[4],
      title:data.title,
      description:data.summary,
      categories:data.tag,
      time:data.time,
      author:data.author
      
    };
    // Save blog in the database
   blog.create(content)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Blog."
        });
      });
  };

  // Find a single Blogs with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    blog.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Blog with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error rin etrieving the Blog with id=" + id
        });
      });
  };

  // Retrieve all Blogs from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  
    blog.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Blogs."
        });
      });
  };

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
  
  
  





 
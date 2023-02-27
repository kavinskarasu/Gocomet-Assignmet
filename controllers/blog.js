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
   let tag=data.tag.split('#');
  
    const content = {
      id: fields[4],
      title:data.title,
      description:data.summary,
      categories:tag[1],
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
//Reteriving blogs by tag
exports.findByTag = (req, res) => {
  const categories = req.params.id;
  
  blog.findAll({ where: { categories: req.params.id }})
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Blog with id=${categories}.`,
          
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error rin etrieving the Blog with id=" + categories
      });
    });
  };
  

module.exports = (sequelize, Sequelize) => {
    const blog = sequelize.define("blog", {
      id:{
        type:Sequelize.STRING,
        primaryKey: true
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.STRING
      },
      categories:{
        type:Sequelize.STRING
      },
      time:{
        type:Sequelize.STRING
      }
    });
  
    return blog;
  };
  
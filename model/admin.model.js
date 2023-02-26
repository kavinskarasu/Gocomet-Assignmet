module.exports = (sequelize, Sequelize) => {
    const admin = sequelize.define("blog", {
      username:{
            type:Sequelize.STRING,
             primaryKey: true
        },
      password: {
        type: Sequelize.STRING,
      },
     
    });
  
    return admin;
  };
  
const dbConfig=require('../config/db.cofig')

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port:32768
  
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.blog = require("./blog.model")(sequelize, Sequelize);
db.admin=require("./admin.model")(sequelize,Sequelize);

module.exports = db;

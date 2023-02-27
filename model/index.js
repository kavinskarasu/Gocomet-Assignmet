const dbConfig=require('../config/db.cofig')

const Sequelize = require("sequelize");
console.log(dbConfig.USER)
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port:32768
  
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.blog = require("./blog")(sequelize, Sequelize);
db.admin=require("./admin")(sequelize,Sequelize);

module.exports = db;

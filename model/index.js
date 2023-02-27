const dbConfig=require('../config/db.cofig')
const dotenv=require('dotenv').config()

const Sequelize = require("sequelize");
console.log(process.env.DB_PORT, "check")
const sequelize = new Sequelize(process.env.DB, process.env.USER_DB, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.dialect,
  port:process.env.DB_PORT,
  dialectOptions: {
    ssl: {
      require: 'true'
    }
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.blog = require("./blog")(sequelize, Sequelize);
db.admin=require("./admin")(sequelize, Sequelize);

module.exports = db;

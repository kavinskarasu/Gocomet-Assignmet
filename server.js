const app = require("./app");
const db = require("./model");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI=require('swagger-ui-express');
const options={
  definition:{
    openapi:"3.0.0",
    info:{
      title:"Blog API",
      version:"1.0.0",
      description:"Gocomet web Scraping Assessment"
    },
    servers:[
      {
        url:"https://blog-crawler.onrender.com"
      }
    ],
  },
    apis:["./router/blog.js"]
  
}
const spes=swaggerJSDoc(options);
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(spes))
db.sequelize.sync();
console.log(process.env.PORT);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

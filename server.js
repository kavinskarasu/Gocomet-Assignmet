

const app = require("./app");
const db = require("./model");

db.sequelize.sync();

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(process.env.PASSWORD)
  console.log(`Server is running on port ${PORT}.`);
});

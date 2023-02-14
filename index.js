/** @format */

const app = require("./app");
const connectWithDB = require("./Config/db");

connectWithDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on Port ${process.env.PORT}`);
});

/*import  dependencies */
const mongoose = require("mongoose");
/*use connection from .env file */
const dotenv = require("dotenv");
dotenv.config();

const connectionUrl = process.env.DATABASE_HOST;
/*connect project to database */
mongoose
  .connect(connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection successfully.....");
  })
  .catch((err) => {
    console.log("connection Failed.....", err);
  });

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectionUrl = process.env.DATABASE_HOST;
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

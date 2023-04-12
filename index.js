const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
require("./config");
const routes = require("./router/routes");
const app = express();
app.use(express.json());
app.use("/socialMedia", routes);
const host = process.env.host || 11000;
app.listen(host, () => {
  console.log(`connection is running on ${host}`);
});

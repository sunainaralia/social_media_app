/*import dependencies */
const express = require("express");
const dotenv = require("dotenv");
/*use body-parser for Specifically in the context of a POST, PATCH, or PUT HTTP request */
const bodyParser = require("body-parser");
dotenv.config();
/*import config file in which we have mongodb connection */
require("./config");
/*import routes from routing file */
const routes = require("./router/routes");
const app = express();
/*use express.json() for convert data to json */
app.use(express.json());
/*use public files for images  */
app.use(express.static(__dirname + "./public/"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/socialMedia", routes);
/*set port */
const host = process.env.host || 8000;
/*app is listening on localhost */
app.listen(host, () => {
  console.log(`connection is running on ${host}`);
});

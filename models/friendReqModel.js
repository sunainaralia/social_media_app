const mongoose = require("mongoose");
const Model = mongoose.model;
const Schema = mongoose.Schema;
const friendReqSchema = new Schema({
  sendTo: { type: String },
  sendBy: { type: String },
});
module.exports = Model("friendReq", friendReqSchema);

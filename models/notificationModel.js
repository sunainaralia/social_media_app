const mongoose = require("mongoose");
const Model = mongoose.model;
const Schema = mongoose.Schema;
const notificationSchema = new Schema({
  notificationTo: { type: String },
  notificationBy: { type: String },
  createdAt: { type: Date, default: Date.now() },
  newNotification: { type: String },
});
module.exports = Model("notificationOfReq", notificationSchema);

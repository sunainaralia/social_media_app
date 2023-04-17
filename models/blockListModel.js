const mongoose = require("mongoose");
const Model = mongoose.model;
const Schema = mongoose.Schema;
const blockListSchema = new Schema({
  _id: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
  age: { type: Number, required: true },
  phoneNo: { type: Number, required: true },
  bio: { type: String },
  city: { type: String },
  country: { type: String },
});
module.exports = Model("blockList", blockListSchema);

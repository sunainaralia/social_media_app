const mongoose = require("mongoose");
const Model = mongoose.model;
const Schema = mongoose.Schema;
const friendListSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  age: { type: Number, required: true },
  phoneNo: { type: Number, required: true },
  bio: { type: String },
  city: { type: String },
  country: { type: String },
  _id: { type: String },
});
module.exports = Model("myFriendList", friendListSchema);

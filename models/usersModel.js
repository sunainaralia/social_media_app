const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Model = mongoose.model;
const Schema = mongoose.Schema;
const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email_Id: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  phoneNo: { type: Number, required: true },
  bio: { type: String },
  city: { type: String },
  country: { type: String },
});
//bcrypt password
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});
module.exports = Model("signUpUser", userSchema);

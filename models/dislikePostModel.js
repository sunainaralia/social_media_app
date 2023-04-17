const mongoose = require("mongoose");
const Model = mongoose.model;
const Schema = mongoose.Schema;
const dislikeSchema = new Schema(
  {
    postId: {
      type: String,
      required: true,
    },
    userId: { type: String },
    user: { type: Object },
  },
  { timestamps: true }
);
module.exports = Model("dislikesList", dislikeSchema);

const mongoose = require("mongoose");
const Model = mongoose.model;
const Schema = mongoose.Schema;
const commentSchema = new Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "postUpload",
    },
    userId: { type: String },
    comment: { type: String },
    user: { type: Object },
  },
  { timestamps: true }
);
module.exports = Model("commentsList", commentSchema);

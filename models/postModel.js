const mongoose = require("mongoose");
const Model = mongoose.model;
const Schema = mongoose.Schema;
const uploadSchema = new Schema({
  description: { type: String },
  user: [{ userDetail: { type: String, require: true } }],
  title: { type: String },
  filePath: { type: String },
  like: { type: Number },
  dislike: { type: Number },
  likeBy: [{ userId: { type: String } }, { timestamps: true }],
  dislikeBy: [{ userId: { type: String } }, { timestamps: true }],
  totalComment: { type: Number },
  totalViews: { type: Number },
  mentionedTo: { type: Number },
  commentsBy: [{ commentorId: { type: String } }, { timestamps: true }],
});
module.exports = Model("postUpload", uploadSchema);

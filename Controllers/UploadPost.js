/*api for uplaod the post */
const postSchema = require("../models/postModel");
const signUpSchema = require("../models/usersModel");
module.exports = async (req, res) => {
  try {
    /*find user thorugh token */
    const userDetails = await signUpSchema.find({ _id: req.payload._id });
    /*uplaod the post and data on post schema */
    const uplaodPost = await new postSchema({
      description: req.body.description,
      user: userDetails[0],
      title: req.body.title,
      filePath: req.body.filePath,
      likes: req.body.likes,
      dislikes: req.body.dislikes,
      isLike: req.body.isLike,
      isDislike: req.body.isDislike,
      totalComment: req.body.total_comment,
    });
    await uplaodPost.save();
    return res.status(200).json({
      success: true,
      message: "image uploaded and post saved succesfully",
      uplaodPost: uplaodPost,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

/*api for delete post */
const postSchema = require("../models/postModel");
module.exports = async (req, res) => {
  try {
    /*find post and delete this */
    const deletePost = await postSchema.findOneAndDelete(req.params);
    return res.status(200).json({
      success: true,
      message: "delete the user successfully",
      deletePost: deletePost,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

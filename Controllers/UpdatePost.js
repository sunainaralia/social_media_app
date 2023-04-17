/*api for update the post */
const postSchema = require("../models/postModel");
module.exports = async (req, res) => {
  try {
    /*find user's post from id and then update it*/
    const updatePost = await postSchema.findByIdAndUpdate(
      { _id: req.params._id },
      {
        $set: {
          totalViews: req.body.totalViews,
          mentionedTo: req.body.mentionedTo,
        },
      }
    );
    await updatePost.save();
    return res.status(200).json({
      success: true,
      message: "updated user's post successfully",
      data: updatePost,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*api for add comment */
const postSchema = require("../models/postModel");
const usersSchema = require("../models/usersModel");
const commentSchema = require("../models/commentModel");
const notificationSchema = require("../models/notificationModel");
module.exports = async (req, res) => {
  try {
    /*find who comment on your post */
    const commentorDetails = await usersSchema.findById(req.payload._id);
    const commentorId = commentorDetails._id;
    /*find my details */
    const usersDetails = await postSchema.find();
    const postId = usersDetails[0]._id;
    /*add comment on post */
    const createComment = await new commentSchema({
      postId: postId,
      userId: commentorId,
      comment: req.body.comment,
      user: commentorDetails,
    });
    await createComment.save();
    /*update the post after adding comment */
    const updateComments = await postSchema.findByIdAndUpdate(
      { _id: postId },
      {
        $push: { commentsBy: commentorId },
      }
    );
    await updateComments.save();
    /*message for user */
    const message = `${req.payload.firstName} comment on your post`;
    /*send notification to the postHolder */
    const notifyUser = await new notificationSchema({
      notificationTo: usersDetails[0]._id,
      notificationBy: req.payload._id,
      newNotification: message,
    });
    await notifyUser.save();
    return res.status(200).json({
      success: true,
      message: "add comment successfully",
      createComment: createComment,
      notifyUser: notifyUser,
      updateComments: updateComments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

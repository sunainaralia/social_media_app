/*api for dislike the post */
const dislikeSchema = require("../models/dislikePostModel");
const likeSchema = require("../models/likePostModel");
const usersSchema = require("../models/usersModel");
const postSchema = require("../models/postModel");
const notificationSchema = require("../models/notificationModel");
/*check, is post is already disliked by user or not*/
const findDislike = async (req, res, next) => {
  try {
    /*find user detail who wants to dislike the post*/
    const userDetails = await usersSchema.findById(req.payload._id);
    const userId = userDetails._id;
    /*find details of user who post*/
    const findPost = await postSchema.findOne();
    const postId = findPost._id;
    /*check this user in dislike schema*/
    const checkDislike = await dislikeSchema.findOne({
      postId: postId,
      userId: userId,
    });
    if (checkDislike === null) {
      next();
    } else {
      return res.status(400).json({
        message: "this post is already disliked by you",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
/*check ,is user liked the post already*/
const findLike = async (req, res, next) => {
  try {
    /*find user detail who wants to dislike the post*/
    const userDetails = await usersSchema.findById(req.payload._id);
    const userId = userDetails._id;
    /*find details of user who post*/
    const findPost = await postSchema.findOne();
    const postId = findPost._id;
    /*check if the user liked the post already or not*/
    const checkLike = await likeSchema.findOne({
      postId: postId,
      userId: userId,
    });
    if (checkLike === null) {
      next();
    } else {
      /*if he already liked the post then delete like by him on post*/
      await likeSchema.deleteOne({
        postId: postId,
        userId: userId,
      });
      next();
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
/*create dislike on post*/
const createDislike = async (req, res, next) => {
  try {
    /*find disliker through id*/
    const userDetails = await usersSchema.findById(req.payload._id);
    const userId = userDetails._id;
    /*find details of user who post*/
    const findPost = await postSchema.findOne();
    const postId = findPost._id;
    /*dislike the post and add data in dislike schema*/
    const dilikePost = await new dislikeSchema({
      postId: postId,
      userId: userId,
      user: userDetails,
    });
    await dilikePost.save();
    /*update dislike in post*/
    const updatePost = await postSchema.findByIdAndUpdate(
      { _id: postId },
      { $push: { dislikeBy: userId } }
    );
    await updatePost.save();
    /*set message*/
    const message = `${req.payload.firstName} dislike your post`;
    /*send notification to the user*/
    const notifyUser = await new notificationSchema({
      notificationTo: postId,
      notificationBy: userId,
      newNotification: message,
    });
    await notifyUser.save();
    return res.status(200).json({
      message: "disliked post successfully",
      dilikePost: dilikePost,
      updatePost: updatePost,
      notifyUser: notifyUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = [findDislike, findLike, createDislike];

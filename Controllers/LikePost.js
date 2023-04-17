/*api for like post*/
const likeSchema = require("../models/likePostModel");
const postSchema = require("../models/postModel");
const dislikeSchema = require("../models/dislikePostModel");
const usersSchema = require("../models/usersModel");
const notificationSchema = require("../models/notificationModel");
/*check if the user already like the post or not*/
const findLike = async (req, res, next) => {
  try {
    /*find liker's details*/
    const userDetails = await usersSchema.findById(req.payload._id);
    const userId = userDetails._id;
    /*find the details of postholder*/
    const findPost = await postSchema.findOne();
    const postId = findPost._id;
    /*check ,is he liked the post*/
    const checkLikes = await likeSchema.findOne({
      postId: postId,
      userId: userId,
    });
    if (checkLikes === null) {
      next();
    } else {
      return res.status(400).json({
        message: "this post is already liked by you",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
/*check if the user already disliked the post or not*/
const findDislike = async (req, res, next) => {
  try {
    /*find liker's details*/
    const userDetails = await usersSchema.findById(req.payload._id);
    const userId = userDetails._id;
    /*find postHolder's details*/
    const findPost = await postSchema.find();
    const postId = findPost[0]._id;
    /*check,disliked or not*/
    const checkDislike = await dislikeSchema.findOne({
      postId: postId,
      userId: userId,
    });
    if (checkDislike === null) {
      next();
    } else {
      /*delete the dislike ,if user  already have done it*/
      await dislikeSchema.deleteOne({
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
/*create like on post*/
const createLike = async (req, res, next) => {
  try {
    /*find postholder's details*/
    const findPost = await postSchema.find();
    const postId = findPost[0]._id;
    /*find user's details*/
    const userDetails = await usersSchema.findById(req.payload._id);
    const userId = userDetails._id;
    /* like on post and add data in like schema*/
    const likeOnPost = await new likeSchema({
      postId: postId,
      userId: userId,
      user: userDetails,
    });
    await likeOnPost.save();
    /*update likes on the post*/
    const updatePost = await postSchema.findByIdAndUpdate(
      { _id: postId },
      {
        $push: { likeBy: userId },
      }
    );
    await updatePost.save();
    /*set message*/
    const message = `${req.payload.firstName} likes your post`;
    /*send notification to the postHolder*/
    const notifyUser = await new notificationSchema({
      notificationTo: postId,
      notificationBy: userId,
      newNotification: message,
    });
    await notifyUser.save();
    return res.status(200).json({
      success: true,
      message: "post liked successfully",
      updatePost: updatePost,
      notifyUser: notifyUser,
      likeOnPost: likeOnPost,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = [findLike, findDislike, createLike];

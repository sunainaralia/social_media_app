/*api for send friend request */
const friendReqSchema = require("../models/friendReqModel");
const usersSchema = require("../models/usersModel");
const notificationSchema = require("../models/notificationModel");
module.exports = async (req, res) => {
  try {
    /* set search key in params*/
    const { searchKey } = req.params;
    /* find user by email in searchkey*/
    const usersDetail = await usersSchema.find({
      $or: [{ email_Id: { $regex: searchKey } }],
    });
    /*get user's id */
    const findId = usersDetail[0]._id;
    /*check if the request is already sent to that particualr person in friend request schema*/
    const checkIsreqSentAlready = await friendReqSchema.find({
      sendTo: findId,
      sendBy: req.payload._id,
    });
    if (checkIsreqSentAlready.length === 0) {
      /* send friend request*/
      const sendReq = await new friendReqSchema({
        sendBy: req.payload._id,
        sendTo: findId,
      });
      /*set message */
      const message = `${req.payload.firstName} wants to send you a friend request`;
      /*send notification to reciever */
      const notifyUser = await new notificationSchema({
        notificationTo: usersDetail[0]._id,
        notificationBy: req.payload._id,
        newNotification: message,
      });
      await sendReq.save();
      await notifyUser.save();
      return res.status(200).json({
        success: true,
        message: "send friend req successfully",
        sendReq: sendReq,
        notifyUser: notifyUser,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "you already sent friend request to this user",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

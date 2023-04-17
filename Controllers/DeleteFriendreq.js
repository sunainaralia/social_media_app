/*api for delete friend request */
const notificationSchema = require("../models/notificationModel");
const friendReqSchema = require("../models/friendReqModel");
module.exports = async (req, res) => {
  try {
    /*find notification */
    const findByNotification = await notificationSchema.find();
    /*check user through notification and find find who send request */
    const checkUser = findByNotification[0].notificationBy;
    if (checkUser) {
      /*delete friend request */
      const deleteFriendReq = await friendReqSchema.findOneAndDelete({
        sendBy: checkUser,
      });
      /*send message */
      const message = `${req.payload._id} delete your friend request`;
      /*send notification to user about delete the frnd request */
      const notifyUser = await new friendReqSchema({
        notificationTo: checkUser,
        notificationBy: req.payload._id,
        newNotification: message,
      });
      await notifyUser.save();
      return res.status(200).json({
        message: "notification and friend request is deleted successfully",
        deleteFriendReq: deleteFriendReq,
        notifyUser: notifyUser,
      });
    } else {
      return res.status(400).json({
        message: "no new notification is found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

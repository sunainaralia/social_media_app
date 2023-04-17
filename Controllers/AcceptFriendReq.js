/*api for accept friend request */
const friendListSchema = require("../models/friendListModel");
const friendReqSchema = require("../models/friendReqModel");
const notificationSchema = require("../models/notificationModel");
const signUpSchema = require("../models/usersModel");

module.exports = async (req, res) => {
  /*use try and catch to get errors */
  try {
    /*find friend request's details from friendReqSchema */
    const findUser = await friendReqSchema.find();
    /*find who send me request */
    const checkUser = findUser[1].sendBy;
    if (checkUser) {
      const findUserDetails = await signUpSchema.findById(checkUser);
      /*accept friend request and get my friend's detail */
      const saveData = await new friendListSchema({
        firstName: findUserDetails.firstName,
        lastName: findUserDetails.lastName,
        age: findUserDetails.age,
        phoneNo: findUserDetails.phoneNo,
        bio: findUserDetails.bio,
        city: findUserDetails.city,
        country: findUserDetails.country,
        _id: findUserDetails._id,
      });
      console.log(saveData);
      /*delete friend request from  friendReqSchema */
      const deleteReqDetails = await friendReqSchema.findOneAndDelete(
        checkUser
      );
      /* set message  */
      const message = `${req.payload.firstName} accept your friend request`;
      /*send notification to sender of request */
      const notifyUser = await new notificationSchema({
        notificationTo: findUserDetails._id,
        notificationBy: req.payload._id,
        newNotification: message,
      });
      await saveData.save();
      await notifyUser.save();
      return res.status(200).json({
        message: "friend request accepted successfully",
        frndListData: saveData,
        notificationData: notifyUser,
        deleteReqDetails: deleteReqDetails,
      });
    } else {
      return res.status(400).json({
        message: "no notification is found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

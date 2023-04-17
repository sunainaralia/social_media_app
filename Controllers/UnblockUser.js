/*api for unblock user */
const blockListSchema = require("../models/blockListModel");
const friendListSchema = require("../models/friendListModel");
const notificationSchema = require("../models/notificationModel");
module.exports = async (req, res) => {
  /*check this user already unblock or not */
  const findUser = await blockListSchema.find();
  const findUserInBlockList = findUser[0];
  if (findUserInBlockList) {
    /*Unblock the user and add this user into friend list */
    const addToFriendList = await new friendListSchema({
      firstName: findUserInBlockList.firstName,
      lastName: findUserInBlockList.lastName,
      age: findUserInBlockList.age,
      phoneNo: findUserInBlockList.phoneNo,
      _id: findUserInBlockList._id,
    });
    await addToFriendList.save();
    /*remove user from blocklist */
    const unblockUser = await blockListSchema.findOneAndDelete(
      findUserInBlockList._id
    );
    /*set message*/
    const message = `${req.payload.firstName} unblocks you`;
    /*send notification to user who is unblocked*/
    const notifyUser = await new notificationSchema({
      notificationTo: findUserInBlockList._id,
      notificationBy: req.payload._id,
      newNotification: message,
    });
    await notifyUser.save();
    return res.status(200).json({
      message: "unblock user successfully",
      addToFriendList: addToFriendList,
      unblockUser: unblockUser,
      notifyUser: notifyUser,
    });
  } else {
    return res.status(400).json({
      message: "this user is already unblocked",
    });
  }
};

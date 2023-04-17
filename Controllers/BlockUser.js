/*api for block the user */
const friendListSchema = require("../models/friendListModel");
const blockListSchema = require("../models/blockListModel");
const notificationSchema = require("../models/blockListModel");
module.exports = async (req, res) => {
  try {
    /*find the  user whom i want to block from my friend list */
    const findUser = await friendListSchema.find();
    const checkUserInList = findUser[0];
    if (checkUserInList.length !== 0) {
      /*add user to blockList */
      const saveDataInBlockList = await new blockListSchema({
        firstName: checkUserInList.firstName,
        lastName: checkUserInList.lastName,
        age: checkUserInList.age,
        phoneNo: checkUserInList.phoneNo,
        _id: checkUserInList._id,
      });
      await saveDataInBlockList.save();
      /*send message */
      const message = `${req.payload.firstName} blocked you `;
      /*send notification about blocking */
      const notifyUser = await new notificationSchema({
        notificationTo: checkUserInList._id,
        notificationBy: req.payload._id,
        newNotification: message,
      });
      await notifyUser.save();
      /*remove the user from my friend list after blocking */
      const deleteUserDetails = await friendListSchema.findOneAndDelete(
        checkUserInList._id
      );
      /*send response */
      return res.status(200).json({
        success: true,
        message: "block user successfully",
        saveDataInBlockList: saveDataInBlockList,
        deleteUserDetails: deleteUserDetails,
        notifyUser: notifyUser,
      });
    } else {
      return res.status(400).json({
        message: "firstly accept friend request",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

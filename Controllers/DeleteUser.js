/*api for delete user */
const usersSchema = require("../models/usersModel");
module.exports = async (req, res) => {
  try {
    /*find user by id and delete */
    const deleteUser = await usersSchema.findByIdAndDelete({
      _id: req.payload._id,
    });
    return res.status(200).json({
      success: true,
      message: "deleted this user successfully",
      deleteUser: deleteUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

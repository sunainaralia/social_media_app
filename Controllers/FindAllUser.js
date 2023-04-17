/*api for find all user*/
const userSchema = require("../models/usersModel");
module.exports = async (req, res) => {
  try {
    /*find all user*/
    const findUser = await userSchema.find();
    return res.status(200).json({
      success: true,
      message: "find all user successfully",
      findUser: findUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

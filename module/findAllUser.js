const userSchema = require("../models/usersModel");
module.exports = async (req, res) => {
  try {
    const findUser = await userSchema.find();
    return res.status(200).json({
      message: "find all user successfully",
      findUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

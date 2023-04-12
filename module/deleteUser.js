const usersSchema = require("../models/usersModel");
module.exports = async (req, res) => {
  try {
    const deleteUser = await usersSchema.findByIdAndDelete(req.params);
    return res.status(200).json({
      message: "deleted this user successfully",
      deleteUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

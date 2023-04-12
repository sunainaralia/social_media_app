const usersSchema = require("../models/usersModel");
module.exports = async (req, res) => {
  try {
    const updateUser = await usersSchema.findByIdAndUpdate(
      { _id: req.params._id },
      {
        $set: {
          bio: req.body.bio,
          city: req.body.city,
          country: req.body.country,
        },
      }
    );
    await updateUser.save();
    return res.status(200).json({
      message: "updated user succesfully",
      updateUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* api for update user's details */
const usersSchema = require("../models/usersModel");
module.exports = async (req, res) => {
  try {
    /*update user's detail through id*/
    const updateUser = await usersSchema.findByIdAndUpdate(
      { _id: req.payload._id },
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
      success: true,
      message: "updated user succesfully",
      updateUser: updateUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*api for forgot or reset password*/
const usersSchema = require("../models/usersModel");
/*use core module to hashed new password*/
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  try {
    /*check email of user*/
    const verifyEmail = await usersSchema.find({
      email_Id: req.payload.email_Id,
    });
    if (verifyEmail.length !== 0) {
      const confirmPassword = req.body.confirmPassword;
      /*check if newPassword and confirmPassword is same or not*/
      if (req.body.newPassword === confirmPassword) {
        /*bcrypt new password*/
        req.body.newPassword = await bcrypt.hash(req.body.newPassword, 8);
        /*change the forgot password*/
        const savePassword = await usersSchema.findByIdAndUpdate(
          { _id: req.payload._id },
          {
            $set: { password: req.body.newPassword },
          }
        );

        await savePassword.save();
        return res.status(200).json({
          success: true,
          message: "new password set successfully",
          savePassword: savePassword,
        });
      } else {
        return res.status(404).json({
          message: "newPassword and confirmPassword is not matched",
        });
      }
    } else {
      return res.status(404).json({
        message: "email is not verified",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

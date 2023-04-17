/*api for change password */
const usersSchema = require("../models/usersModel");
/*user bcrypt core module for hashed password */
const bcrypt = require("bcrypt");
module.exports = async (req, res) => {
  try {
    /*verify user's authentication from email and get data of user */
    const verifyEmail = await usersSchema.find({
      email_Id: req.payload.email_Id,
    });
    /*check condition for (if email is valid or not) */
    if (verifyEmail.length !== 0) {
      /*compare password */
      const comparePassword = bcrypt.compare(
        req.body.password,
        verifyEmail[0].password
      );
      if (comparePassword) {
        /*bcrypt new password */
        req.body.newPassword = await bcrypt.hash(req.body.newPassword, 8);
        /*update password */
        const changePassword = await usersSchema.findByIdAndUpdate(
          { _id: req.payload._id },
          {
            $set: { password: req.body.newPassword },
          }
        );
        await changePassword.save();
        return res.status(200).json({
          success: true,
          message: "password changed successfully",
          changePassword: changePassword,
        });
      } else {
        return res.status(400).json({
          message: "old password is not matched",
        });
      }
    } else {
      return res.status(400).json({
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

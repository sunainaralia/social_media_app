const usersSchema = require("../models/usersModel");
const bcrypt = require("bcrypt");
module.exports = async (req, res) => {
  try {
    const verifyEmail = await usersSchema.find({ email_Id: req.body.email_Id });
    if (verifyEmail.length !== 0) {
      //compare password
      const comparePassword = bcrypt.compare(
        req.body.password,
        verifyEmail[0].password
      );
      if (comparePassword) {
        //bcrypt new password
        req.body.newPassword = await bcrypt.hash(req.body.newPassword, 8);
        //update password
        const changePassword = await usersSchema.findByIdAndUpdate(
          { _id: req.params._id },
          {
            $set: { password: req.body.newPassword },
          }
        );
        await changePassword.save();
        return res.status(200).json({
          message: "password changed successfully",
          changePassword,
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

const signUpSchema = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = async (req, res) => {
  try {
    const verifyEmail = await signUpSchema.find({
      email_Id: req.body.email_Id,
    });
    if (verifyEmail.length !== 0) {
      const comparePassword = bcrypt.compare(
        req.body.password,
        verifyEmail[0].password
      );
      if (comparePassword) {
        jwt.sign(
          { email_Id: verifyEmail[0].email_Id, _id: verifyEmail[0]._id },
          "secretkey",
          { expiresIn: "5h" },
          (err, token) => {
            return res.status(200).json({
              message: "login succesfully and token generated too",
              token: token,
            });
          }
        );
      } else {
        return res.status(400).json({
          message: "password is not correct ,please enter correctly",
        });
      }
    } else {
      return res.status(400).json({
        message: "email_id is not matched, please enter it correctly",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

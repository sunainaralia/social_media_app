/*api for login the user*/
const signUpSchema = require("../models/usersModel");
/*use core module for hash the user's password*/
const bcrypt = require("bcrypt");
/*use jwt token for authenticate the user*/
const jwt = require("jsonwebtoken");
module.exports = async (req, res) => {
  try {
    /*check email of user*/
    const verifyEmail = await signUpSchema.find({
      email_Id: req.body.email_Id,
    });
    if (verifyEmail.length !== 0) {
      /*check password thorugh comparison the bcrypted and original passsword*/
      const comparePassword = bcrypt.compare(
        req.body.password,
        verifyEmail[0].password
      );
      if (comparePassword) {
        /*create jwt token at the time of login the user*/
        jwt.sign(
          {
            email_Id: verifyEmail[0].email_Id,
            _id: verifyEmail[0]._id,
            firstName: verifyEmail[0].firstName,
          },
          "secretkey",
          { expiresIn: "5h" },
          (err, token) => {
            return res.status(200).json({
              success: true,
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

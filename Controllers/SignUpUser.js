/*api for signUp user  */
const signUpSchema = require("../models/usersModel");
const jwt = require("jsonwebtoken");
module.exports = async (req, res) => {
  try {
    /*check user's email,if this user already exsist or not */
    const verifyEmail = await signUpSchema.find({
      email_Id: req.body.email_Id,
    });
    if (verifyEmail.length === 0) {
      /*save user's data in signUp schema*/
      const signUpUser = await new signUpSchema({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNo: req.body.phoneNo,
        email_Id: req.body.email_Id,
        password: req.body.password,
        age: req.body.age,
      });
      await signUpUser.save();
      /*create jwt token for authentiacation the user*/
      jwt.sign(
        { signUpUser },
        "secretkey",
        { expiresIn: "2h" },
        (err, token) => {
          return res.status(200).json({
            success: true,
            message: "data saved and token generated succesfully",
            token: token,
          });
        }
      );
    } else {
      return res.status(400).json({
        message: "user already exists",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

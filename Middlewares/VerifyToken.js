/*verify the token and used it as middleware  */
const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  try {
    const verifyToken = req.headers["token"];
    /*use split ()for extract token */
    const useToken = verifyToken.split(" ");
    const token = useToken[0];
    /*verify  the token */
    await jwt.verify(token, "secretkey", (err, payload) => {
      if (err) {
        return res.status(400).json({
          success: true,
          message: "token is expired",
        });
      }
      /* find user's detail from token  */
      req.payload = payload;
      next();
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

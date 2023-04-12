const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  const verifyToken = req.headers["token"];
  const useToken = verifyToken.split(" ");
  const token = useToken[0];
  await jwt.verify(token, "secretkey", (err, payload) => {
    if (err) {
      return res.status(400).json({
        success: true,
        message: "token is expired",
      });
    }
    req.payload = payload;
    next();
  });
};

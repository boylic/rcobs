const jwt = require("jsonwebtoken");
const secret = process.env.secret;

module.exports = (req, res, next) => {
  const Accesstoken = req.headers.auth;
  console.log(Accesstoken);
  if (!Accesstoken) {
    return res.status(501).json({
      error: true,
      message: "Unauthorized, Please Login",
    });
  }

  const token = Accesstoken.split("")[1];

  jwt.verify(token, secret, (error, payload) => {
    if (error) {
      return res.status(403).json({
        error: true,
        message: "Invalid Token",
      });
    }

    req.user = payload;
    next();
  });
};

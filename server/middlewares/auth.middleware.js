const tokenService = require("../services/token.service");

module.exports = async (req, res, next) => {
  try {
    const { accesstoken } = req.cookies;

    // accesstoken is not valid or expired
    if (!accesstoken) {
      throw new Error();
    }

    const userData = await tokenService.verifyAccessToken(accesstoken);
    if (!userData) {
      throw new Error();
    }

    // attaching the userData
    req.user = userData;
    next();
  } catch (err) {
    res.status(401).json({
      message: "Invalid Token",
    });
  }
};

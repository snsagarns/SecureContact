const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");

module.exports = {
  ensureAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error_msg", "Please log in first");
    res.redirect("/users/login");
  },
};

/*
const auth = asyncHandler(async (req, res, next) => {
  let token;
  // bearer sdhsdshdsdhsds
  // sent in header so,
  // bearer token
  // example
  //{
  //   "userId": "627408e8d4f128b9fdde18b7",
  //   "iat": 1651872142,
  //   "exp": 1654464142
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from header // split turns into array and we just need token
      // bearer text first string and token 2nd item in array
      token = req.headers.authorization.split(" ")[1];

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // get user from the token coz token has user id as payload
      // we don't want password hashed
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorized");
    }
    x;
  }
});
module.exports = { auth };
*/

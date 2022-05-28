const express = require("express");

// require("../config/passport")(passport);
const router = express.Router();
const passport = require("passport");
const { registerUser, loginUser, getProfile } = require("../controllers/users");
const { auth } = require("../middleware/authMiddleware");
router.post("/register", registerUser);

// Login Handle
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/contacts",
    failureRedirect: "/users/loginFail",
    failureFlash: true,
  })(req, res, next);
});
router.get("/loginFail", (req, res) => {
  res.render("login_fail", {});
});
router.get("/register", (req, res) => {
  res.render("register");
});
router.get("/login", (req, res) => {
  res.render("login", {});
});

router.get("/logout", (req, res) => {
  req.logOut();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
});
// router.post("/users/login", loginUser);
// var ensureLoggedIn = function (req, res, next) {
//   if (req.user) {
//     next();
//   } else {
//     res.redirect("/users/login");
//   }
// };
// in order to add authentication and protect it
router.get("/myprofile", getProfile);

module.exports = router;

const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const passport = require("passport");
const registerUser = asyncHandler(async (req, res) => {
  // destructuring
  const { name, username, password } = req.body;
  if (!username || !name || !password) {
    res.status(400);
  }
  // check if user exists
  const userExists = await User.findOne({ username });
  if (userExists) {
    res.status(400);
    throw new Error("Sorry but user already exists");
  }

  // Hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    username: username,
    password: hashedPassword,
  });
  if (user) {
    // res.status(201).json({
    // //   _id: user.id,
    // //   name: user.name,
    // //   email: user.email,
    // //   token: generateToken(user._id),
    // //   message: 200,
    // });
    req.flash("success_msg", " You are now registered and rennady to login");
    res.redirect(201, "/users/login");
  } else {
    res.status(400);
    throw new Error("Invalid New User");
  }
});

// require("../config/passport")(passport);

const loginUser = asyncHandler(async (req, res) => {
  console.log(req.message);

  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      username: user.username,
      token: generateToken(user._id),
      message: 200,
    });
  } else {
    res.status(400);
    res.render("login_fail", {});
  }
});

const getProfile = asyncHandler(async (req, res, auth) => {
  const { _id, name, username } = await User.findById(req.user.id);
  res.status(200).json({
    id: _id,
    name,
    username,
  });
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
};

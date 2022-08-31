const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

/**
 * Mongoose and Bcryptjs are asynchronous.
 */

// @description Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, password, email } = req.body;

  if (!name || !password || !email) {
    res.status(400);
    throw new Error("Please fill in all required fields.");
  }

  //validation: check if the user already exist.
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists.");
  }

  //Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create the User
  const user = await User.create({
    name: name,
    password: hashedPassword,
    email: email,
  });

  if (user) {
    //if the user is created send a response that notifies the user.
    res.status(201).json({
      message: "User has been successfully created.",
      _id: user.id,
      name: user.name,
      email: user.email,
      JWTtoken: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data.");
  }
});

// @description Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    //brcypt.compare compares the string password and the hashed password.
    //if the email and the password match, its authenticated.
    res.json({
      message: "Login successful.",
      _id: user.id,
      name: user.name,
      email: user.email,
      JWTtoken: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials.");
  }
});

// @description Get user data
// @route GET /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  res.json({
    message: "user data.",
  });
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7 days",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};

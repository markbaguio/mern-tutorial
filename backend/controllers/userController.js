// @description Register a new user
// @route POST /api/users
// @access Public
const registerUser = (req, res) => {
  res.json({ message: "registered" });
};

// @description Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = (req, res) => {
  res.json({ message: "logged in" });
};

// @description Get user data
// @route GET /api/users/me
// @access Public
const getMe = (req, res) => {
  res.json({ message: "user data." });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};

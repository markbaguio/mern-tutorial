const express = require("express");
const ROUTER = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

ROUTER.post("/", registerUser);
ROUTER.post("/login", loginUser);
ROUTER.get("/me", protect, getMe);

module.exports = ROUTER;

const express = require("express");
const ROUTER = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");

ROUTER.post("/", registerUser);
ROUTER.post("/login", loginUser);
ROUTER.get("/me", getMe);

module.exports = ROUTER;

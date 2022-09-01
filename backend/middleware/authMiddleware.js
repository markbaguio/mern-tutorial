const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get the token from the bearer header.
      token = req.headers.authorization.split(" ")[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      /**
       * this allows all of the routes that uses
       * this middleware to have access to the req.user
       * and all of its contents such as, req.user.id which
       * returns the _id of the specified user.
       */
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      // this runs if the token is tampered or wrong.
      console.log(error);
      res.status(401);
      throw new Error("Not authtorized.");
    }
  }
  // if there is no token at all.
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token.");
  }
});

module.exports = protect;

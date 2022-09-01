const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");
/**
 * if we dont wanna use try-catch we can utilize express-async-handler package.
 * express-async-handler is just like try-catch, it is used to
 * handle exceptions inside of an async route then it passes it to the
 * express error handler.
 */

/**
 *  since mongoose returns a promise,
 *  all callback functions should be async.
 */

// @description Get goals
// @route GET /api/goals
// @access Private after authentication
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json({ user: req.user.name, goals: goals });
});

// @description Set goals
// @route POST /api/goals
// @access Private after authentication
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field"); //this is express built in error handler.
    //errorMiddleware.js to change the content type of the error.
  }

  const newGoal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(newGoal);
});

// @description Update goal
// @route PUT /api/goals/:id
// @access Private after authentication
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  //validation: if the specified goal is not found.
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found.");
  }

  //get user's id
  const user = await User.findById(req.user.id); //logged in user's id.

  //check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found.");
  }

  //Make sure the logged in user matches the goal creator.
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User is not authorized.");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({ status: "Goal Updated.", goal: updatedGoal });
});

// @description delete goal
// @route DELETE /api/goals/:id
// @access Private after authentication
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found.");
  }

  //get user's id
  const user = await User.findById(req.user.id); //logged in user's id.

  //check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found.");
  }

  //Make sure the logged user matches the goal user.
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User is not authorized.");
  }

  await goal.remove();

  res.status(200).json({
    message: `The goal with the id of ${req.params.id} has been deleted.`,
    id: req.params.id,
  });

  /**
   * res.status(200).json({ message: `Delete goal ${req.params.id}` }); -> this will throw an error.
   * if you send another status or any response after the first one,
   * it will throw an HTTP error: "Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client".
   * Basically, you should not send a response after the process is finished.
   */
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};

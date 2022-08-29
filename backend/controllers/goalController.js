const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
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
  const goals = await Goal.find({});
  res.status(200).json(goals);
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

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
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

  await goal.remove();
  res.status(200).json({
    message: `The goal with the id of ${req.params.id} has been deleted.`,
    id: req.params.id,
  });

  res.status(200).json({ message: `Delete goal ${req.params.id}` });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};

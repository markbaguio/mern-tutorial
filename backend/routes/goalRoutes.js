const express = require("express");
const ROUTER = express.Router();
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

/**
 *  since GET goals and SET goals are almost the same syntax wise.
 *  We could clean it up a little more. Same with UPDATE(PUT) goal and DELETE goal,
 *  since they are also the same syntax wise we could
 *  also use .route method to clean it up a little more.
 */

ROUTER.route("/").get(getGoals).post(setGoal);
ROUTER.route("/:id").put(updateGoal).delete(deleteGoal);

//get goals
//ROUTER.get("/", getGoals);

//create goal
//ROUTER.post("/", setGoal);

//update goal
//ROUTER.put("/:id", updateGoal);

//delete goal
//ROUTER.delete("/:id", deleteGoal);

module.exports = ROUTER;

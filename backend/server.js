//this is the entry point
const express = require("express");
const dotEnv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");

const PORT = process.env.PORT || 5000; //use the port specified in the .env file or port 5000 if it encountered problems.
const app = express();

//app.use() is utilized to add middleware.
//To use the body data of the request.
app.use(express.json()); //this is a built in body parser for raw json in express.
app.use(express.urlencoded({ extended: false }));

//Initialize and execute routes.
app.use("/api/goals", require("./routes/goalRoutes"));

//overwrite the default built in error handler from express
app.use(errorHandler);

//server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});

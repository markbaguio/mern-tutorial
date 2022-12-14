//this file is the entry point
const express = require("express");
const dotEnv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const colors = require("colors");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000; //use the port specified in the .env file or port 5000 if it encountered problems.
const app = express();

//connect to the database.
connectDB();

//app.use() is utilized to add middleware.
//To use the body data of the request.
app.use(express.json()); //this is a built in body parser for raw json in express.
app.use(express.urlencoded({ extended: false }));

//Initialize and execute routes.
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

//overwrite the default built in error handler from express
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Server is up and running.");
});

//server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});

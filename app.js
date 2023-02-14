/** @format */

// Importing Libraries/modules ...
const express = require("express");
require("dotenv").config();

const app = express();
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// Importing Routes ...
const UserRoutes = require("./Routes/UserRoutes");
const TaskRoutes = require("./Routes/TaskRoutes");

// Adding Middlewares ...
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("tiny"));

// Adding Routes ...
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome !!",
  });
});

app.use("/api/v1", UserRoutes);
app.use("/api/v1", TaskRoutes);

// Exporting ...
module.exports = app;

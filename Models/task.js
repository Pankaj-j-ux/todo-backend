/** @format */

const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: Boolean,
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Task", taskSchema);

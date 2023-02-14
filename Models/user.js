/** @format */

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name is necessary"],
  },

  email: {
    type: String,
    required: [true, "Email is necessary"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Password is necessary"],
    minlength: [8, "Password should be atleast 6 character"],
  },

  verified: {
    type: Boolean,
    default: false,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
});

// encrypt password brfore save ...
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isValidatePass = async function (queryPass) {
  return await bcrypt.compare(queryPass, this.password);
};

module.exports = mongoose.model("User", userSchema);

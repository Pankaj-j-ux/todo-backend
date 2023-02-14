/** @format */

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userVerficationSchema = new mongoose.Schema({
  userId: String,
  uniqueString: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expireAt: {
    type: Date,
  },
});

userVerficationSchema.pre("save", async function (next) {
  if (!this.isModified("uniqueString")) return next();
  this.uniqueString = await bcrypt.hash(this.uniqueString, 10);
});

userVerficationSchema.methods.isValidateUS = async function (queryUS) {
  return await bcrypt.compare(queryUS, this.password);
};

module.exports = mongoose.model("UserVerification", userVerficationSchema);

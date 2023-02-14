/** @format */

const User = require("../Models/user");
const UserVerification = require("../Models/userVerification");
const sendVerificationEmail = require("../Utility/sendVerificationEmail");
const path = require("path");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res, next) => {
  try {
    let { name, email, password } = req.body;
    const emailRegex = new RegExp(
      /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
      "gm"
    );
    name = name.trim();
    email = email.trim();
    password = password.trim();

    if (name == "" || email == "" || password == "") {
      throw new Error("Empty input fields!");
    } else if (!emailRegex.test(email)) {
      throw new Error("Invalid email entered!");
    } else if (password.length < 8) {
      throw new Error("Password is too short!");
    } else {
      const user = await User.find({ email });
      if (user.length) {
        throw new Error("User with the provided email already exists.");
      }
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    const result = await newUser.save();
    result.password = undefined;

    sendVerificationEmail(result, req, res);

    // res.status(200).json({
    //   status: "success",
    //   success: true,
    //   data: result,
    // });
  } catch (err) {
    console.log("Error from SignUp : ", err);
    res.status(500).json({
      status: "failure",
      success: false,
      message: err.message,
    });
  }
};

exports.signin = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();

    const emailRegex = new RegExp(
      /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
      "gm"
    );

    if (email == "" || password == "") {
      throw new Error("Empty input fields!");
    } else if (!emailRegex.test(email)) {
      throw new Error("Invalid email entered!");
    } else {
      const user = await User.find({ email });
      if (!user.length) {
        throw new Error("User with the provided email does not exists.");
      } else if (!user[0].verified) {
        throw new Error("Email id not Verified!");
      } else if (!(await user[0].isValidatePass(password))) {
        throw new Error("Incorrect password!");
      } else {
        user[0].password = undefined;
        res.status(200).json({
          status: "success",
          success: true,
          data: user[0],
        });
      }
    }
  } catch (err) {
    console.log("Error from Sign In : ", err);
    res.status(500).json({
      status: "failure",
      success: false,
      message: err.message,
    });
  }
};

exports.verifyEmail = async (req, res, next) => {
  try {
    const { id, uniqueString } = req.params;
    let result = await UserVerification.find({ userId: id });
    if (!result.length) {
      res.redirect(`/api/v1/email/verified/failure`);
      // throw new Error(
      //   "Account record doesn't exist or has been verified already. Please Sign up or login."
      // );
    } else {
      const { expireAt } = result[0];
      const hashedUniqueString = result[0].uniqueString;

      if (expireAt < Date.now()) {
        await UserVerification.deleteOne({ userId: id });
        await User.deleteOne({ _id: id });
        res.redirect(`/api/v1/email/verified/failure`);
        // throw new Error("Link has expired. Please Sign up again!");
      } else {
        if (true || (await result[0].isValidateUS(uniqueString))) {
          await User.updateOne({ _id: id }, { verified: true });
          await UserVerification.deleteOne({ userId: id });
          res.redirect(`/api/v1/email/verified/success`);
        } else {
          res.redirect(`/api/v1/email/verified/failure`);
          // throw new Error(
          //   "Invalid Verification details passed. Check your inbox."
          // );
        }
      }
    }

    // res.redirect(`/api/v1/email/verified/success`);
  } catch (err) {
    console.log("Error form Verify Email", err);
    res.status().json({
      status: "failure",
      success: false,
      message: err.message,
    });
  }
};

exports.success = (req, res, next) => {
  res.sendFile(path.join(__dirname, "./../View/success.html"));
};
exports.failure = (req, res, next) => {
  res.sendFile(path.join(__dirname, "./../View/failure.html"));
};

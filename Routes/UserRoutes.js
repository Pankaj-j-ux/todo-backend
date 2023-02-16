/** @format */

const express = require("express");
const router = express.Router();

const {
  signup,
  signin,
  verifyEmail,
  success,
  failure,
  sendPasswordForgotLink,
  forgotPasswordController,
  proceedFP,
} = require("../Controllers/UserControllers");

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/email/verify/:id/:uniqueString").get(verifyEmail);
router.route("/email/verified/success").get(success);
router.route("/email/verified/failure").get(failure);
router.route("/sendfotgotpasswordlink").post(sendPasswordForgotLink);
router.route("/forgotpassword/:id/:uniqueString").get(forgotPasswordController);
router.route("/proceed/forgotpassord").get(proceedFP);

module.exports = router;

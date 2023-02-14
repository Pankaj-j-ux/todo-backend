/** @format */

const express = require("express");
const router = express.Router();

const {
  signup,
  signin,
  verifyEmail,
  success,
  failure,
} = require("../Controllers/UserControllers");

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/email/verified/success").get(success);
router.route("/email/verified/failure").get(failure);
router.route("/email/verify/:id/:uniqueString").get(verifyEmail);

module.exports = router;

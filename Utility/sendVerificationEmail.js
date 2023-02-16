/** @format */
const { v4: uuidv4 } = require("uuid");
const userVerification = require("../Models/userVerification");
const emailHelper = require("../Utility/emailHelper");

const sendVerificationEmail = async (result, req, res) => {
  try {
    const { _id, email } = result;
    const uniqueString = uuidv4();
    const url = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/email/verify/${_id}/${uniqueString}`;
    const subject = "TODO: Verify your email";
    const message = `<p>Verify your email address to complete the signup into your account.</p><p>This link <b>expires in 6 hours</b></p><p>Press <a href=${url}>here</a> to proceed</a></p>`;

    const verificationObject = await userVerification.find({ _id });
    if (verificationObject.length) {
      userVerification.deleteOne({ userId: _id });
    }

    const newVerification = new userVerification({
      userId: _id,
      uniqueString,
      expireAt: Date.now() + 21600000,
    });

    await newVerification.save();

    emailHelper({ email, message, subject }, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "failure",
      success: false,
      message: err.message,
    });
  }
};

module.exports = sendVerificationEmail;

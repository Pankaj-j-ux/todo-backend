/** @format */

const nodeMailer = require("nodemailer");

const emailHelper = async (options, res) => {
  try {
    const transporter = nodeMailer.createTransport({
      service: "hotmail",
      auth: {
        user: process.env.AUTH_USER, // generated ethereal user
        pass: process.env.AUTH_PASS,
      },
    });

    const message = {
      from: "TODO Developer <pankaj.s1131@hotmail.com>", // sender address
      to: options.email, // list of receivers
      subject: options.subject, // Subject line
      // text: options.message, // plain text body
      html: options.message, // html body
    };

    // send mail with defined transport object
    await transporter.sendMail(message);

    res.status(200).json({
      status: "pending",
      success: true,
      message: "Verification email sent!",
    });
  } catch (err) {
    console.log("Error for Email Helper", err);
    res.status(500).json({
      status: "failure",
      success: false,
      message: err.message,
    });
  }
};

module.exports = emailHelper;

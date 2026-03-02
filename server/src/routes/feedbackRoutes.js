const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {

  const { name, email, message } = req.body;

  try {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: "New Feedback from Website",
      text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Feedback sent successfully" });

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Email failed to send" });

  }
});

module.exports = router;
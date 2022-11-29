require("dotenv").config();
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const User = require("../../models/User");

const grabUsers = async () => {
  let email_arr = [];
  try {
    let users = await User.find();
    users.forEach((user) => {
      email_arr.push(user.email);
    });
    return email_arr;
  } catch (error) {
    console.log(error);
  }
};

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject("Failed to create access token :(");
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      accessToken,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    },
  });
  return transporter;
};

const sendEmail = async (emailOptions) => {
  let emailTransporter = await createTransporter();
  try {
    await emailTransporter.sendMail(emailOptions);
  } catch (error) {
    console.log(error);
  }
};

const colorConverter = {
  "YELLOW": "Low",
  "ORANGE": "Medium",
  "RED": "High",
}

router.post("/mail", async (req, res) => {
  let message = req.body.description;
  let station = req.body.station;
  let intensity = req.body.intensity;
  let convertInten = colorConverter[intensity]
  let emails = await grabUsers();
  sendEmail({
    subject: `New Alert at ${station}`,
    text: `Dear valued New Yorker, an alert (Hazard Level: ${convertInten}) has been issued.\nAlert message:\n${message}\n\nPlease visit the app for more information: https://aa-linealert.onrender.com \nStay Safe,\nLineAlert`,
    bcc: emails,
    from: "LineAlert",
  })
    .then(() => res.json("hey man that was great success"))
    .catch(() => res.json("not so much great success very sad"));
});

module.exports = router;

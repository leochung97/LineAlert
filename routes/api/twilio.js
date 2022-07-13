// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");
const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// const response = axios.post(
//   `https://api.twilio.com/2010-04-01/Accounts/${process.env.TWILIO_ACCOUNT_SID}/OutgoingCallerIds.json`,
//   "FriendlyName=Third Party VOIP Number&StatusCallback=https://somefunction.twil.io/caller-id-validation-callback&PhoneNumber=+17182006821",
//   {
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     auth: {
//       username: `${process.env.TWILIO_ACCOUNT_SID}`,
//       password: `${process.env.TWILIO_AUTH_TOKEN}`,
//     },
//   }
// );
// console.log(process.env.TWILIO_ACCOUNT_SID);
// console.log(process.env.SERVICE_SID);

router.get("/send", (req, res) => {
  client.verify
    .services(process.env.SERVICE_SID)
    .verifications.create({
      to: "+19177445075",
      channel: "sms",
    })
    .then((data) => {
      res.status(200).json({
        message: "Successfully sent!",
        phoneNumber: req.body.phoneNumber,
        data,
      });
    })
    .catch((err) => console.log(err));
});

router.get("/validate", (req, res) => {
  client.validationRequests
    .create({
      friendlyName: "Third Party VOIP Number",
      statusCallback:
        "https://somefunction.twil.io/caller-id-validation-callback",
      phoneNumber: `+6462094763`,
    })
    .then((validation_request) => res.status(200).json(validation_request))
    .catch((err) => console.log(err));
});

router.get("/verify", (req, res) => {
  client.verify
    .services(process.env.SERVICE_SID)
    .verificationChecks.create({
      to: `+19177445075`,
      code: req.body.code,
    })
    .then((data) => {
      if (data.status === "approved") {
        res.status(200).send({
          message: "User is Verified!!",
          data,
        });
      }
    })
    .catch((err) => res.json(err));
});

module.exports = router;

const express = require("express");
const router = express.Router();
const axios = require("axios");

const googleUrl = `https://maps.googleapis.com/maps/api/js?key=`;
const endingUrl = `&libraries=places`;

router.get("/", (req, res) => {
  if (process.env.REACT_APP_MAP_KEY) {
    res.json(googleUrl.concat(process.env.REACT_APP_MAP_KEY).concat(endingUrl));
  } else {
    return res.status(400).json("Api key is missing");
  }
});

module.exports = router;

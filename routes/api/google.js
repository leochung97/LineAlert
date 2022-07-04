const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res) => {
  if (process.env.REACT_APP_MAP_KEY) {
    res.json(process.env.REACT_APP_MAP_KEY);
  } else {
    return res.status(400).json("Api key is missing");
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", (req, res) => {
  console.log("this was hit");
  if (process.env.REACT_APP_MAP_KEY) {
    res.json(process.env.REACT_APP_MAP_KEY);
  } else {
    return res.status(400).json("Api key is missing");
  }
  // axios.get(REACT_APP_MAP_KEY)
  // .then(response => {
  //   res.json(response.data);
  // })
  // .catch(error => {
  //   res.status(500).json({error});
  // })
});

module.exports = router;

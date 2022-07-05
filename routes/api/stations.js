const express = require("express");
const router = express.Router();
const passport = require('passport');
const Station = require("../../models/Station")
const validateStationInput = require('../../validation/stations');

router.get("/:id", (req, res) => {
    Station.findOne({ name: req.body.name })
    .then( (alerts) => res.json(alerts))
    .catch( (err) => res.json({noalertsfound : "No Alerts"}))
})

router.post("/", (req, res) => {
  const { errors, isValid } = validateStationInput(req.body);
  
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newStation = new Station({
    name: req.body.name,
    line: req.body.line,
    alerts: req.body.alerts
  });

  newStation.save().then(station => res.json(station));
})

module.exports = router
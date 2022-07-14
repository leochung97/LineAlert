const express = require("express");
const router = express.Router();
const passport = require('passport');
const Station = require("../../models/Station")
const validateStationInput = require('../../validation/stations');


router.get("/", (req, res) => { //gets all stations
  Station.find()
  .then( (stations) => res.json(stations))
  .catch( (err) => res.json({nostationsfound : "No Stations Found"}))
})

router.get("/:id", (req, res) => {
    Station.findById(req.params.id)
      .then( (station) => {
        res.json(station)})
      .catch( (err) => {
        console.log(err);
      })
})

router.post("/", (req, res) => {
  const { errors, isValid } = validateStationInput(req.body);
  
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newStation = new Station({
    name: req.body.name,
    line: req.body.line,
    alerts: req.body.alerts,
    latLng: {
      lat: req.body.latLng.lat,
      lng: req.body.latLng.lng
    }
  });

  newStation.save().then(station => res.json(station));
})

module.exports = router
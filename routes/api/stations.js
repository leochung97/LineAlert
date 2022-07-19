const express = require("express");
const router = express.Router();
const passport = require('passport');
const Station = require("../../models/Station")

router.get("/", (req, res) => { 
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

// Below should only be commented in when we need to add all borough stations

// router.post("/", (req, res) => {1
//   if (!isValid) {
//     return res.status(400).json(errors);
//   }

//   const newStation = new Station({
//     name: req.body.name,
//     line: req.body.line,
//     latLng: {
//       lat: req.body.latLng.lat,
//       lng: req.body.latLng.lng
//     }
//   });

//   newStation.save().then(station => res.json(station));
// })

module.exports = router
const express = require("express");
const router = express.Router();
const passport = require("passport");
const Alert = require("../../models/Alert");
const validateAlertInput = require("../../validation/alerts");
const Station = require("../../models/Station");

router.get("/", (req, res) => {
  Alert.find()
    .then((alerts) => res.json(alerts))
    .catch((err) => res.json({ noalertsfound: "No Alerts" }));
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateAlertInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    let stationSearch = new RegExp("^" + req.body.station + "$", "i");
    Station.findOne({ name: { $regex: stationSearch } })
      .then((station) => {
        const newAlert = new Alert({
          station: station.id,
          description: req.body.description,
          user: req.user.id,
          intensity: req.body.intensity,
        });
        newAlert
          .save()
          .then((alert) => res.json(alert))
          .catch((err) => res.json(err));
      })
      .catch((err) => res.json(err));
  }
);

router.patch(
  "/:id", //edits alert
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateAlertInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Alert.findByIdAndUpdate(req.params.id, {
      description: req.body.description,
      intensity: req.body.intensity,
    })
      .then((alert) => {
        return res.json(alert);
      })
      .catch((err) => {
        errors.id = "Alert does not exist";
        return res.status(400).json(errors);
      });
  }
);

router.delete("/:id", (req, res) => {
  //deletes alert
  Alert.deleteOne({ _id: req.params.id })
    .then((res) => console.log("Alert removed"))
    .catch((err) => res.json("Alert does not exist"));
});

module.exports = router;

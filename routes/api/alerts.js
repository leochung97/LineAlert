const express = require("express");
const router = express.Router();
const passport = require('passport');
const Alert = require("../../models/Alert")
const validateAlertInput = require('../../validation/alerts');

router.get("/", (req, res) => { //gets all alerts
  Alert.find()
  .then( (alerts) => res.json(alerts))
  .catch( (err) => res.json({noalertsfound : "No Alerts"}))
})

router.post('/', //creates alert
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateAlertInput(req.body);
    
        if (!isValid) {
          return res.status(400).json(errors);
        }
    
        const newAlert = new Alert({
          station: req.body.station,
          description: req.body.description,
          user: req.user.id,
          intensity: req.body.intensity
        });
    
        newAlert.save().then(alert => res.json(alert));
    }
);

router.patch('/:id', //edits alert
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateAlertInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Alert.findByIdAndUpdate( req.params.id, {
      description: req.body.description,
      intensity: req.body.intensity
      })
      .then( alert => {
        return res.json(alert)
      })
      .catch( err => {
        errors.id = 'Alert does not exist';
        return res.status(400).json(errors);
      })
  }
)

router.delete('/id', (req, res) => { //unable to test??
  Alert.findByIdAndRemove({_id: req.params.id})
    .then(res => console.log("Alert removed"))
    .catch(err => res.json('Alert does not exist'))
})

module.exports = router;
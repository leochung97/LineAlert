const express = require("express");
const router = express.Router();
const passport = require('passport');
const Alert = require("../../models/Alert")
const validateAlertInput = require('../../validation/alerts');

router.post('/',
    passport.authenticate('jwt',{ session: false }),
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
module.exports = router
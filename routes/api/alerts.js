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
          location: req.body.location,
          description: req.body.description,
          user: req.user.id
        });
    
        newAlert.save().then(alert => res.json(alert));
    }
);
module.exports = router
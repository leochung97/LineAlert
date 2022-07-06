const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateAlertInput(data) {
  let errors = {};
  
  data.description = validText(data.description) ? data.description : '';
  data.station = validText(data.station) ? data.station : '';
  data.intensity = validText(data.intensity) ? data.intensity : '';

  if (!Validator.isLength(data.description, { min: 5, max: 300 })) {
    errors.description = 'Alert must be between 5 and 300 characters';
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = 'Description is required';
  }

  if (Validator.isEmpty(data.station)) {
    errors.station = 'Location is required';
  }

  if (Validator.isEmpty(data.intensity)) {
    errors.intensity = 'Please choose danger level';
  }
  
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
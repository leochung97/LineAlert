const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateAlertInput(data) {
  let errors = {};
  
  data.location = validText(data.location) ? data.location : '';
  data.description = validText(data.description) ? data.description : '';


  if (!Validator.isLength(data.description, { min: 5, max: 300 })) {
    errors.description = 'Alert must be between 5 and 300 characters';
  }
  if (Validator.isEmpty(data.description)) {
    errors.description = 'Description is required';
  }

  if (Validator.isEmpty(data.location)) {
    errors.location = 'Your location is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
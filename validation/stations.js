const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateStationInput(data) {
  let errors = {};
  
  data.name = validText(data.name) ? data.name : '';
  data.line = validText(data.line) ? data.line : '';

  // if (!Validator.isLength(data.name, { min: 5, max: 50 })) {
  //   errors.name = "Station name must be between 5 and 50 characters";
  // }

  // if (Validator.isEmpty(data.name)) {
  //   errors.name = "Station name is required";
  // }

  // if (Object.values(data.line).length === 0) {
  //   errors.line = 'Station must contain a line';
  // }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateEditInput(data) {
  let errors = {};
  
  data.mobile = validText(data.mobile) ? data.mobile : "";
  data.preferences = validText(data.preferences) ? data.preferences : "";

  if (!Validator.isLength(data.mobile, { min: 12, max: 12 })) {
    errors.mobile = "Phone number must be 12 characters";
  }

  if (Validator.isEmpty(data.mobile)) {
    errors.mobile = "Phone number is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
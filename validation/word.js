const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateWordInput(data) {
  let errors = {};
  data.ugrWordCyr = !isEmpty(data.ugrWordCyr) ? data.ugrWordCyr : '';
  data.rusTranslation = !isEmpty(data.rusTranslation)
    ? data.rusTranslation
    : '';

  if (Validator.isEmpty(data.ugrWordCyr)) {
    errors.ugrWordCyr = 'Uyghur word field is required';
  }

  if (Validator.isEmpty(data.rusTranslation)) {
    errors.rusTranslation = 'Russian word field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

/** @module validate_password */
'use strict';

const strengths = {
  medium: /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
  strong: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
};

/**
 * Utility function to validate whether an email is valid
 * @param {string} strength (medium || strong)
 * @param {*} password
 * @returns {boolean} is password valid
 */
module.exports = (password, strength) => {
  switch (strength) {
  case 'medium':
    return strengths.medium.test(password.toString());
  case 'strong':
    return strengths.strong.test(password.toString());
  default:
    return strengths.strong.test(password.toString());
  }
};

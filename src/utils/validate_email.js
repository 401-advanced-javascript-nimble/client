/**
 * Utility function to validate whether an email is valid
 * @module validate_email
 * @param {*} email
 * @returns {boolean}
 */
module.exports = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toString());

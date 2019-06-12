const validateEmail = require('./validate_email');
const validatePassword = require('./validate_password');

module.exports = {
  WELCOME: {
    type: 'toggle',
    name: 'hasAccount',
    message: `Welcome stranger, do you have an account?`,
    active: 'maybe',
    inactive: 'no',
  },
  USERNAME: {
    type: 'text',
    name: 'username',
    message: prev => (prev ? `What's your username` : 'Choose a username'),
    validate: username => username != '',
  },
  EMAIL: {
    type: 'text',
    name: 'email',
    message: 'Enter your email address (just in case you loose your password)',
    validate: email =>
      validateEmail(email) ? true : 'Please enter a valid email',
  },
  PASSWORD: {
    type: 'password',
    name: 'password',
    message: prev => (prev ? `What's your password` : 'Choose a password'),
    validate: password =>
      validatePassword(password, 'medium')
        ? true
        : 'The password must be at least 6 characters long and contains a capital letter, and a number, and a special character',
  },
};

'use strict';

require('dotenv').config();

const superagent = require('superagent');
const prompts = require('prompts');

const validateEmail = require('../utils/validate_email.js');
const validatePassword = require('../utils/validate_password.js');

const Configstore = require('configstore');
const packageJson = require('../../package.json');

const config = new Configstore(packageJson.name);

async function signUp() {
  const questions = [
    {
      type: 'text',
      name: 'username',
      message: 'Choose a username',
      validate: username => username != ''
    },
    {
      type: 'text',
      name: 'email',
      message:
        'Enter your email address (just in case you loose your password)',
      validate: email =>
        validateEmail(email) ? true : 'Please enter a valid email'
    },
    {
      type: 'password',
      name: 'password',
      message: 'Choose a password',
      validate: password =>
        validatePassword(password, 'medium')
          ? true
          : 'The password must be at least 6 characters long and contains a capital letter, and a number, and a special character'
    },
  ];

  try {
    const { username, email, password } = await prompts(questions);
    
    const response = await superagent
      .post(`${process.env.API_SERVER_URI}/signup`)
      .send({
        username,
        email,
        password,
      });

    const token = response.res.text;
    console.log('This is the token:', token);

    //Becky - Adding a property to our config object to hold the user token.
    config.set('auth.token', token);

    console.log('account created');
    
  } catch (error) {
    console.error(error);
  }
}

module.exports = signUp;

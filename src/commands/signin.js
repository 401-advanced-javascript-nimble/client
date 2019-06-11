'use strict';

require('dotenv').config();

const superagent = require('superagent');
const prompts = require('prompts');
const Configstore = require('configstore');
const packageJson = require('../../package.json');

const config = new Configstore(packageJson.name);

async function signIn() {
  const questions = [
    {
      type: 'text',
      name: 'username',
      message: 'Enter your username',
      validate: username => username != '',
    },
    {
      type: 'password',
      name: 'password',
      message: 'Enter your password',
    },
  ];

  try {
    const { username, password } = await prompts(questions);

    const response = await superagent
      .post(`${process.env.API_SERVER_URI}/signin`)
      .auth(username, password);

    const token = response.res.text;

    //Becky - Adding a property to our config object to hold the user token.
    config.set('auth.token', token);

    const { value: startNewGame } = await prompts({
      type: 'confirm',
      name: 'value',
      message: 'Start a game?',
      initial: true,
    });

    if (startNewGame) require('../lib/client.js');
  } catch (error) {
    console.error(JSON.parse(error.response.text).error);
  }
}

module.exports = signIn;

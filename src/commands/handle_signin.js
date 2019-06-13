'use strict';

require('dotenv').config();

const prompts = require('prompts');
const clear = require('clear');
const figlet = require('figlet');

const User = require('../lib/User.js');

const menu = require('../utils/menu.js');
const questions = require('../utils/questions.js');

async function handleSignIn() {
  try {
    const { username, password } = await prompts([
      questions.signIn.USERNAME,
      questions.signIn.PASSWORD,
    ]);

    const user = new User(username);
    await user.signIn(password);

    clear();
    console.log(figlet.textSync('Nim', 'Standard'));
    await menu(user.username);
  } catch (error) {
    console.error('😨  Oh No! Something went wrong...');
  }
}

exports.play = 'asdf';

'use strict';

const Game = require('../lib/game.js');
const User = require('../lib/user.js');

async function play() {
  if (await User.validateToken()) {
    new Game();
  } else {
    console.log('Invalid user, please sign in again');
  }
}

module.exports = play;

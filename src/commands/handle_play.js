/** @module handle_play */
'use strict';

const Game = require('../lib/game.js');
const User = require('../lib/user.js');

/**
 * Handler function for the play command
 */
async function play() {
  try {
    if (await User.validateToken()) {
      new Game();
    } else {
      console.log('Invalid user, please sign in again');
    }
  } catch (error) {
    console.error('😨  Oh No! Something went wrong...');
  }
}

module.exports = play;

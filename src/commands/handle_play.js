'use strict';

const isTokenValid = require('../utils/is_token_valid.js');

async function play() {
  if (await isTokenValid()) {
    require('../lib/client.js');
  } else {
    console.log('Invalid user, please sign in again');
  }
}

module.exports = play;

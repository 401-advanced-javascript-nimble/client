'use strict';

const User = require('../lib/User.js');

function handleSignOut() {
  User.signOut();
}

module.exports = handleSignOut;

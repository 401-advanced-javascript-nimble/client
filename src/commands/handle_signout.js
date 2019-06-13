'use strict';

const User = require('../lib/user.js');

function handleSignOut() {
  User.signOut();
}

module.exports = handleSignOut;

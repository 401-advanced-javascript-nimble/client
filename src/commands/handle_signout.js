/** @module handle_signout */

'use strict';

const User = require('../lib/user.js');

/**
 * Handler function for the signout command
 */
function handleSignOut() {
  User.signOut();
}

module.exports = handleSignOut;

'use strict';

const Configstore = require('configstore');
const packageJson = require('../../package.json');

const config = new Configstore(packageJson.name);

function signOut() {
  config.delete('auth.token');
  console.log('Signing out');

}

module.exports = signOut;

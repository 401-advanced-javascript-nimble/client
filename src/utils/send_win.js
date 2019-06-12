'use strict';

const superagent = require('superagent');
require('superagent-auth-bearer')(superagent);

const Configstore = require('configstore');
const packageJson = require('../../package.json');

const config = new Configstore(packageJson.name);

function sendWin() {
  const token = config.get('auth.token');
  superagent.post(`${process.env.API_SERVER_URI}/updateStats`)
    .authBearer(token);
}

module.exports = sendWin;
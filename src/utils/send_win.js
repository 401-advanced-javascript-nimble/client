'use strict';

const superagent = require('superagent');
require('superagent-auth-bearer')(superagent);

const Configstore = require('configstore');
const packageJson = require('../../package.json');

const config = new Configstore(packageJson.name);

async function sendWin() {
  const token = config.get('auth.token');
  await superagent.patch(`${process.env.API_SERVER_URI}/updateStats`)
    .authBearer(token)
    .send({win: 'win'});
  return;
}

module.exports = sendWin;
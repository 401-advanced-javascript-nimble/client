/**
 * @module is_token_valid
 * Check if a token exist and if it is valid
 */

'use strict';

const superagent = require('superagent');
require('superagent-auth-bearer')(superagent);

const Configstore = require('configstore');
const packageJson = require('../../package.json');

const config = new Configstore(packageJson.name);

module.exports = async () => {
  try {
    if (config.has('auth.token')) {
      const token = config.get('auth.token');
      const { status } = await superagent
        .post(`${process.env.API_SERVER_URI}/validate`)
        .authBearer(token);
      return status === 204;
    } else {
      console.error('no token');
    }
  } catch (error) {
    console.error(error);
  }
};

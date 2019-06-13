/** @module user */
'use strict';

require('dotenv').config();

const superagent = require('superagent');
require('superagent-auth-bearer')(superagent);

const Configstore = require('configstore');
const packageJson = require('../../package.json');

const config = new Configstore(packageJson.name);

/**
 * Class representing a user
 */
class User {
  /**
   * Create a user
   * @param {string} username
   */
  constructor(username) {
    this.username = username;
  }

  /**
   * Create a new user
   * Sign In
   * And store the token with Configstore
   * @param {string} password
   */
  async signUp(password) {
    try {
      const response = await superagent
        .post(`${process.env.API_SERVER_URI}/signup`)
        .send({
          username: this.username,
          password,
        });

      const token = response.res.text;

      //Becky - Adding a property to our config object to hold the user token.
      config.set('auth.token', token);
      config.set('auth.username', this.username);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Sign In
   * And store the token with Configstore
   * @param {string} password
   */
  async signIn(password) {
    try {
      const response = await superagent
        .post(`${process.env.API_SERVER_URI}/signin`)
        .auth(this.username, password);

      const token = response.res.text;

      //Becky - Adding a property to our config object to hold the user token.
      config.set('auth.token', token);
      config.set('auth.username', this.username);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete the stored token
   * The user is kept on purpose, this is questionnable though
   */
  static signOut() {
    config.delete('auth.token');
  }

  /**
   * Check if a token exists and if it is valid
   */
  static async validateToken() {
    try {
      // Check if the token exist in the Configstorage and validate it against the API server
      if (config.has('auth.token')) {
        const token = config.get('auth.token');
        const { status } = await superagent
          .post(`${process.env.API_SERVER_URI}/validate`)
          .authBearer(token);
        return status === 204;
      } else {
        throw 'No token';
      }
    } catch (error) {
      console.error('😨  Oh No! Something went wrong...');
    }
  }

  /**
   * Update the user's stats
   */
  static async sendWin() {
    const token = config.get('auth.token');
    await superagent
      .patch(`${process.env.API_SERVER_URI}/updateStats`)
      .authBearer(token)
      .send({ win: 'win' });
    return;
  }
}

module.exports = User;

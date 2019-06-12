require('dotenv').config();

const superagent = require('superagent');

const Configstore = require('configstore');
const packageJson = require('../../package.json');

const config = new Configstore(packageJson.name);

/**
 * Class representing a user
 */
class User {
  /**
   * Create a user
   * @param {*} username
   */
  constructor(username) {
    this.username = username;
  }

  /**
   * Create a new user
   * Sign In
   * And store the token with Configstore
   */
  async signUp(password) {
    try {
      const response = await superagent
        .post(`${process.env.API_SERVER_URI}/signup`)
        .send({
          username: this.username,
        });

      const token = response.res.text;

      //Becky - Adding a property to our config object to hold the user token.
      config.set('auth.token', token);
      config.set('auth.username', this.username);

      console.log(`Welcome onboard ${this.username}`);
    } catch (error) {
      console.error('😨  Oh No! Something went wrong...');
    }
  }

  /**
   * Sign In
   * And store the token with Configstore
   */
  async signIn(password) {
    try {
      const response = await superagent
        .post(`${process.env.API_SERVER_URI}/signin`)
        .auth(this.username);

      const token = response.res.text;

      //Becky - Adding a property to our config object to hold the user token.
      config.set('auth.token', token);
      config.set('auth.username', this.username);

      console.log(`Welcome back ${this.username}!`);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Delete the stored token
   */
  static signOut() {
    config.delete('auth.token');
  }
}

module.exports = User;

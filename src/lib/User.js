require('dotenv').config();

const superagent = require('superagent');

const Configstore = require('configstore');
const packageJson = require('../../package.json');

const config = new Configstore(packageJson.name);

class User {
  constructor(username, password) {
    this.username = username;
  }

  /**
   * signUp also signIn the user
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
      console.error('😨  Oh No! Something went wrong...');
    }
  }

  static signOut() {
    config.delete('auth.token');
  }
}

module.exports = User;

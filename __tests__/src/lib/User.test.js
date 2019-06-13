const User = require('../../../src/lib/user.js');

const Configstore = require('configstore');
const packageJson = require('../../../package.json');

const config = new Configstore(`${packageJson.name}`);

const username = 'testuser';
const password = 't3st!1234';

const user = new User(username);

describe('User', () => {
  it('can create an instance of User', () => {
    expect(user).toBeInstanceOf(User);
  });

  it('can access the username', () => {
    expect(user.username).toEqual('testuser');
  });

  xdescribe('Sign Up', () => {
    it('can sign up', async () => {
      const newUser = new User('automated-test');
      await newUser.signUp('secret');
      expect(config.get('auth.username')).toEqual('automated-test');
    });
  });

  xdescribe('Sign In', () => {
    it('can sign in', async () => {
      await user.signIn(password);
      expect(config.get('auth.username')).toEqual('testuser');
    });
  });

  xdescribe('Sign Out', () => {
    it('can sign out', () => {
      User.signOut();
      expect(config.get('auth.token')).toBeUndefined();
    });
  });
});

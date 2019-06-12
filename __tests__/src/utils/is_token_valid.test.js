const Configstore = require('configstore');
const packageJson = require('../../../package.json');
const isTokenValid = require('../../../src/utils/is_token_valid.js');

const User = require('../../../src/lib/User.js');

const config = new Configstore(`${packageJson.name}`);

const username = 'testuser';
const password = 't3st!1234';

const user = new User(username);

describe('Is token valid', () => {
  it('returns true when given a valid token', async () => {
    await user.signIn(password);
    expect(await isTokenValid()).toBeTruthy();
  });

  it('returns nothing when no token is found', async () => {
    User.signOut();
    expect(await isTokenValid()).toBeUndefined();
  });
});

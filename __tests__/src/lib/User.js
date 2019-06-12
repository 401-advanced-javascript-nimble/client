const User = require('../../../src/lib/User.js');

describe('User', () => {
  it('can create an instance of User', () => {
    const user = new User('test', 'password');
  });
});

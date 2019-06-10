const validateEmail = require('../../../src/utils/validate_email.js');

describe('Validate email', () => {
  it('returns true when a good email is provided', () => {
    expect(validateEmail('john.doe@domain.com')).toBeTruthy();
  });

  it('returns false when a wrong email is provided', () => {
    expect(validateEmail('john doe at domain')).toBeFalsy();
  });
});

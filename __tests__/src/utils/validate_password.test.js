const validatePassword = require('../../../src/utils/validate_password.js');

describe('Validate password', () => {
  describe('Medium', () => {
    it('returns true when a password matches the medium criteria', () => {
      expect(validatePassword('hiWd!19', 'medium')).toBeTruthy();
    });

    it('returns false when a password does not match the medium criteria', () => {
      expect(validatePassword('hiworld', 'medium')).toBeFalsy();
    });
  });

  describe('Strong', () => {
    it('returns true when a password matches the strong criteria', () => {
      expect(validatePassword('helloWorld!19', 'strong')).toBeTruthy();
    });

    it('returns false when a password does not match the medium criteria', () => {
      expect(validatePassword('helloworld', 'strong')).toBeFalsy();
    });
  });

  describe('Default', () => {
    it('returns true when a good password is tested without specifying the strength', () => {
      expect(validatePassword('helloWorld!19')).toBeTruthy();
    });

    it('returns false when a bad password is tested without specifying the strength', () => {
      expect(validatePassword('helloworld', 'strong')).toBeFalsy();
    });
  });
});

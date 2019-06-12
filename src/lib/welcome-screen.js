const prompts = require('prompts');
const figlet = require('figlet');
const clear = require('clear');

const User = require('../lib/User.js');

const questions = require('../utils/questions.js');
const menu = require('../utils/menu.js');

const Configstore = require('configstore');
const packageJson = require('../../package.json');

const config = new Configstore(packageJson.name);

const isReturning = config.has('auth.token');
const username = config.get('auth.username');

const newUserQuestions = [
  questions.WELCOME,
  questions.USERNAME,
  questions.PASSWORD,
];

module.exports = async () => {
  try {
    clear();

    console.log(figlet.textSync('Nim', 'Standard'));

    if (isReturning) {
      const onSubmit = (prompt, response) => {
        switch (prompt.name) {
        case 'existingUser':
          return false;
        }
      };
      const fn = await prompts(menu(username));

      if (typeof fn.value === 'function') fn.value();
    } else {
      const { hasAccount, username, password } = await prompts(
        newUserQuestions
      );

      const user = new User(username, password);

      if (hasAccount) user.signIn();
      else user.signUp();
    }
  } catch (error) {
    console.error(error);
  }
};

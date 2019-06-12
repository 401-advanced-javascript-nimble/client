const prompts = require('prompts');
const figlet = require('figlet');
const clear = require('clear');

const handleSignUp = require('../commands/signup.js');
const handleSignIn = require('../commands/signin.js');
const handlePlay = require('../commands/play.js');
const handleLeaderboard = require('../commands/leaderboard.js');
const handleSignOut = require('../commands/signout.js');

const Configstore = require('configstore');
const packageJson = require('../../package.json');

const config = new Configstore(packageJson.name);

const username = config.get('auth.username');

const newUser = [
  {
    type: 'toggle',
    name: 'createAnAccount',
    message: `Welcome stranger, let's start by creating an account`,
    initial: true,
    active: 'ok',
    inactive: 'no',
  },
  {
    type: 'text',
    name: 'username',
    message: `Alright! What's your username`,
  },
  {
    type: 'text',
    name: 'username',
    message: `Great! What's your email (just in case you were to forget your password 🤷‍  )`,
  },
  {
    type: 'text',
    name: 'about',
    message: 'Tell something about yourself',
    initial: 'Why should I?',
  },
];

const returningUser = {
  type: 'select',
  name: 'value',
  message: `Welcome back ${username}! What do you want to do?`,
  choices: [
    {
      title: '🔒  Create an new account',
      value: handleSignUp,
    },
    {
      title: '🔑  Sign in',
      value: handleSignIn,
      warn: 'Doh! You are already signed in',
      disabled: true,
    },
    { title: '🎮  Play', value: handlePlay },
    { title: '🏆  Leaderboard', value: handleLeaderboard },
    { title: '👋  Signout', value: handleSignOut },
  ],
  initial: 2,
};

module.exports = async () => {
  try {
    clear();
    figlet('Nim', async (err, data) => {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      console.log(data);

      const fn = await prompts(
        config.has('auth.token') ? returningUser : newUser
      );

      if (typeof fn.value === 'function') fn.value();
    });
  } catch (error) {
    console.error(error);
  }
};

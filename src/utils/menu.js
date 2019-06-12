const prompts = require('prompts');
const clear = require('clear');
const figlet = require('figlet');

const handlePlay = require('../commands/play.js');
const handleLeaderboard = require('../commands/leaderboard.js');
const handleSignOut = require('../commands/signout.js');

module.exports = async username => {
  const fn = await prompts({
    type: 'select',
    name: 'value',
    message: `Welcome back ${username}!`,
    choices: [
      { title: '🎮  Play', value: handlePlay },
      { title: '🏆  Leaderboard', value: handleLeaderboard },
      { title: '👋  Signout', value: handleSignOut },
    ],
    initial: 0,
  });
  if (typeof fn.value === 'function') fn.value();
};

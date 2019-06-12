const prompts = require('prompts');

const handlePlay = require('../commands/handle_play.js');
const handleLeaderboard = require('../commands/handle_leaderboard.js');
const handleSignOut = require('../commands/handle_signout.js');

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

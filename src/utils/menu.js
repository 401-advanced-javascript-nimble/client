const handlePlay = require('../commands/play.js');
const handleLeaderboard = require('../commands/leaderboard.js');
const handleSignOut = require('../commands/signout.js');

module.exports = username => ({
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

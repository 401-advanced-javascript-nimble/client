/** @module menu */

const prompts = require('prompts');

const handlePlay = require('../commands/handle_play.js');
const handleLeaderboard = require('../commands/handle_leaderboard.js');
const handleSignOut = require('../commands/handle_signout.js');

/**
 * Requires the username to know who to greet
 * This function is only called when the username is known
 * @param {string} username
 */
module.exports = async username => {
  try {
    // Get the handlers function ref from the prompt
    const { fn } = await prompts({
      type: 'select',
      name: 'fn',
      message: `Welcome ${username}!`,
      choices: [
        { title: '🎮  Play', value: handlePlay },
        { title: '🏆  Leaderboard', value: handleLeaderboard },
        { title: '👋  Sign Out', value: handleSignOut },
      ],
      initial: 0,
    });

    // If prompts has returned a function, run it
    if (typeof fn === 'function') fn();
  } catch (error) {
    console.error('😨  Oh No! Something went wrong...');
  }
};

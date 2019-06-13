/** @module handle_leaderboard */
'use strict';

const superagent = require('superagent');
const Table = require('cli-table');
const figlet = require('figlet');

const scores = new Table({ head: ['Player', 'Wins'] });

const API_SERVER_URI =
  process.env.API_SERVER_URI || 'https://nimble-api-server.herokuapp.com';

/**
 * Handler function for the leaderboard command
 */
async function leaderboard() {
  try {
    //superagent request to the learderboard route
    const result = await superagent.get(`${API_SERVER_URI}/leaderboard`);
    const topScores = result.body.TopScores;

    topScores.forEach(player => {
      scores.push([player.username, player.wins]);
    });

    figlet('LeaderBoard', (err, data) => {
      console.log(data);
      console.log(scores.toString());
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = leaderboard;

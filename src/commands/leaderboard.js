'use strict';

const superagent = require('superagent');
const Table = require('cli-table');
const figlet = require('figlet');

const scores = new Table({head: ['Player', 'Wins']});

async function leaderboard() {
  //superagent request to the learderboard route
  const result = await superagent.get(`${process.env.API_SERVER_URI}/leaderboard`);
  const topScores = result.body.TopScores;

  topScores.forEach( player => {
    scores.push([player.username, player.wins]);
  });
  figlet('LeaderBoard', (err, data) => {
    console.log(data);
    console.log(scores.toString());
  });
}

module.exports = leaderboard;

'use strict';

const fakeLeaderboard = [
  {
    player: 'lisa',
    score: 100
  },
  {
    player: 'john',
    score: 98
  },
  {
    player: 'sam',
    score: 78
  }
];

function leaderboard() {
  console.table(fakeLeaderboard);
}

module.exports = leaderboard;

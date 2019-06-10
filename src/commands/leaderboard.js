'use strict';

const commander = require('commander');
const program = new commander.Command();

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

program.command('leaderboard').action(() => {
  console.table(fakeLeaderboard);
});

program.parse(process.argv);

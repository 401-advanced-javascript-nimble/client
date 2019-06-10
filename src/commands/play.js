'use strict';

const commander = require('commander');
const program = new commander.Command();

program.command('play').action(() => {
  console.log('Playing the game');
});

program.parse(process.argv);

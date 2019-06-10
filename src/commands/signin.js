'use strict';

const commander = require('commander');
const program = new commander.Command();

program.command('signin').action(() => {
  console.log('Signing in');
});

program.parse(process.argv);

'use strict';

const commander = require('commander');
const program = new commander.Command();

program.command('signout').action(() => {
  console.log('Signing out');
});

program.parse(process.argv);

'use strict';

const commander = require('commander');
const program = new commander.Command();

program.command('play').action(() => {
  require('../lib/client.js');
});

program.parse(process.argv);

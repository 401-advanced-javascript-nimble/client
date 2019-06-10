#!/usr/bin/env node
const commander = require('commander');
const program = new commander.Command();

/**
 * Handler functions
 */
const handleSignUp = require('./src/commands/signup.js');
const handleSignIn = require('./src/commands/signin.js');
const handlePlay = require('./src/commands/play.js');
const handleLeaderboard = require('./src/commands/leaderboard.js');
const handleSignOut = require('./src/commands/signout.js');

/**
 * Commands
 * -h (--help) is automatically generated by commander
 */
program.command('signup').action(handleSignUp);
program.command('signin').action(handleSignIn);
program.command('play').action(handlePlay);
program.command('leaderboard').action(handleLeaderboard);
program.command('signout').action(handleSignOut);

/**
 * Show help when no command is provided
 */
if (!process.argv.slice(2).length) {
  program.outputHelp();
}

program.parse(process.argv);

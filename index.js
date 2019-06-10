#!/usr/bin/env node

const commander = require('commander');
const program = new commander.Command();
const prompts = require('prompts');

/**
 * Commands
 * -h (--help) is automatically generated by commander
 */
require('./src/commands/signup.js');
require('./src/commands/signin.js');
require('./src/commands/play.js');
require('./src/commands/leaderboard.js');
require('./src/commands/signout.js');
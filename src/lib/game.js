/** @module game */
'use strict';

require('dotenv').config();
const client = require('socket.io-client');
const prompts = require('prompts');
const User = require('../lib/user.js');
const ansiEscapes = require('ansi-escapes');

const SOCKET_SERVER_URL =
  process.env.SOCKET_SERVER_URL ||
  'https://401-advanced-javascript-nimble-socket-server.azurewebsites.net';

/**
 * Class representing a game
 */
class Game {
  /**
   * Create a game
   */
  constructor() {
    //Morgana - use deployed link
    this.socket = client.connect(SOCKET_SERVER_URL);
    this.count = 1;
    this.timeLeft = 20;
    this.countdown = null; 
    this.decrement = this.decrement.bind(this); 
  }

  decrement() {
    this.timeLeft--;
    this.drawTimer(this.timeLeft);
  }

  drawTimer(timeLeft) {
    process.stdout.write(ansiEscapes.cursorSavePosition);
    process.stdout.write(ansiEscapes.cursorPrevLine);
    process.stdout.write(ansiEscapes.cursorPrevLine);
    process.stdout.clearLine();
    process.stdout.write('Your Turn!');
    process.stdout.write(ansiEscapes.cursorNextLine);
    process.stdout.clearLine();
    if (timeLeft >= 0) {
      process.stdout.write('Time left: ');
      process.stdout.write(timeLeft.toString());
      if (timeLeft < 10) {
        process.stdout.write(' <-- Time\'s almost up, hurry!');
      }
    }
    process.stdout.write(ansiEscapes.cursorRestorePosition);
  }
  /**
   * Start listening for events from the server
   */
  start() {
    //===================================
    // Client Socket
    //===================================
    this.socket.on('message-from-server', message => {
      console.log(message);
    });

    this.socket.on('turn', payload => {
      // process.stdout.write(ansiEscapes.clearScreen);
      this.showPrompt(payload);
      this.countdown = setInterval(this.decrement, 1000, this.timeLeft);
    });

    this.socket.on('game over', payload => {
      console.log('Game Over!');
      this.socket.close();
      process.exit();
    });

    this.socket.on('win', () => {
      console.log('You Won!!');
      User.sendWin();
    });
  }

  //===================================
  // Prompt Functionality
  //===================================

  //Morgana - reusable prompt function
  //calls itself again if an invalid selection is made
  /**
   * @param {*} payload
   */
  async showPrompt(payload) {
    try {
      //Morgana - payload at 0 is the game id, payload at 1 is the message
      console.log(payload[1]);
    
      Object.keys(payload[1]).forEach(key => {
        console.log(
          `${key}(${payload[1][key].toString().padStart(2, '0')}) ${'█'.repeat(
            payload[1][key]
          )}`
        );
      });

      console.log('Your Turn!');
      console.log('Time left: 20');
      const gameID = payload[0];
      const questions = [
        {
          type: 'select',
          name: 'stack',
          message: 'Which stack?',
          choices: Object.keys(payload[1]).map(key => ({
            title: key,
            value: key,
            disabled: payload[1][key] === 0,
          })),
        },
        {
          type: 'number',
          name: 'amount',
          message: 'How much?',
          min: 1,
          onRender() {
            this.count = 2;
          },
        },
      ];

      const response = await prompts(questions, () => {
        this.socket.close();
      });
      if (this.checkChoices(response.stack, response.amount, payload[1])) {
        clearInterval(this.countdown);
        this.timeLeft = 20;
        this.socket.emit('move', [gameID, response.stack, response.amount]);
        this.count = 1;
      } else {
        this.count = 1;
        await this.showPrompt(payload);
      }
    } catch (error) {
      // If the user exit the prompt, it emitts a disconect event and end the game
      this.socket.close();
    }
  }

  //===================================
  // Client Side Game Logic
  //===================================

  // Chris - checks and validates the players' inputs.
  // Morgana - Changed to reflect new stack structure
  /**
   *
   * @param {*} stackChoice
   * @param {*} numberToTake
   * @param {*} stacks
   */
  checkChoices(stackChoice, numberToTake, stacks) {
    // checks and validation for stackChoice
    stackChoice.toLowerCase();
    if (!Object.keys(stacks).includes(stackChoice)) {
      console.log('Invalid stack, please pick again.');
      return false;
    }

    // checks and validation for numberToTake
    if (typeof numberToTake !== 'number') {
      numberToTake = parseInt(numberToTake);
    }
    if (
      isNaN(numberToTake) ||
      numberToTake < 1 ||
      numberToTake > stacks[stackChoice]
    ) {
      console.log('Invalid amount, please pick again');
      return false;
    }

    // Chris - if all the above is good continue
    return true;
  }
}

module.exports = Game;

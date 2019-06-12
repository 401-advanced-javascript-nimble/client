'use strict';

require('dotenv').config();
const client = require('socket.io-client');
const prompts = require('prompts');
const sendWin = require('../utils/send_win.js');
const ansiEscapes = require('ansi-escapes');

//Morgana - use deployed link
const socket = client.connect(process.env.SOCKET_SERVER_URL);

let count = 1;
//===================================
// Client Socket
//===================================

socket.on('message-from-server', message => {
  console.log(message);
});

socket.on('turn', (payload) => {
  // process.stdout.write(ansiEscapes.clearScreen);
  showPrompt(payload);
});

socket.on('countdown', (payload) => {
  process.stdout.write(ansiEscapes.cursorSavePosition);
  process.stdout.write(ansiEscapes.cursorPrevLine);
  if (count === 2) {
    process.stdout.write(ansiEscapes.cursorPrevLine);
  }
  process.stdout.clearLine();
  if(payload >= 0) {
    process.stdout.write('Time left: ');
    process.stdout.write(payload.toString());
    if(payload < 10) {
      process.stdout.write(' <-- Time\'s almost up, hurry!');
    }
  }
  process.stdout.write(ansiEscapes.cursorRestorePosition);
});

socket.on('game over', (payload) => {
  console.log('Game Over!');
  socket.close();
});

socket.on('win', () => {
  console.log('You Won!!');
  sendWin();
});



//===================================
// Prompt Functionality
//===================================

//Morgana - reusable prompt function
//calls itself again if an invalid selection is made 
function showPrompt(payload) {
  //Morgana - payload at 0 is the game id, payload at 1 is the message
  console.log(payload[1]);
  console.log('Your Turn!');
  console.log('Time left: ', 20);
  const gameID = payload[0];
  const questions = [
    {
      type: 'text',
      name: 'stack',
      message: 'Which stack?',
    },
    {
      type: 'number',
      name: 'amount',
      message: 'How much?',
      onRender() { count = 2; },
    },
  ];
  (async () => {
    const response = await prompts(questions);
    if(checkChoices(response.stack, response.amount, payload[1])) {
      socket.emit('move', [gameID, response.stack, response.amount]);
      count = 1;
    }
    else {
      count = 1;
      showPrompt(payload);
    }
  })();
}

//===================================
// Client Side Game Logic
//===================================


// Chris - checks and validates the players' inputs.
// Morgana - Changed to reflect new stack structure
const checkChoices = (stackChoice, numberToTake, stacks) => {
  // checks and validation for stackChoice
  stackChoice.toLowerCase();
  if(!Object.keys(stacks).includes(stackChoice)) {
    console.log('Invalid stack, please pick again.');
    return false;
  }
  
  // checks and validation for numberToTake
  if(typeof numberToTake !== 'number') {
    numberToTake = parseInt(numberToTake);
  }
  if(isNaN(numberToTake) || numberToTake < 1 || numberToTake > stacks[stackChoice]) {
    console.log('Invalid amount, please pick again');
    return false;
  }

  // Chris - if all the above is good continue
  return true;
};


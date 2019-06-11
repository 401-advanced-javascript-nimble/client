'use strict';

require('dotenv').config();
const client = require('socket.io-client');
const prompt = require('prompt');

//Morgana - use deployed link
const socket = client.connect(process.env.SOCKET_SERVER_URL);

//===================================
// Client Socket
//===================================

prompt.message = 'Your move';

socket.on('message-from-server', message => {
  console.log(message);
});

socket.on('turn', (payload) => {
  showPrompt(payload);
});

socket.on('game over', (payload) => {
  console.log('Game Over!');
  socket.close();
});


//===================================
// Prompt Functionality
//===================================

//Morgana - reusable prompt function
//calls itself again if an invalid selection is made 
function showPrompt(payload) {
  //Morgana - payload at 0 is the game id, payload at 1 is the message
  console.log(payload[1]);
  const gameID = payload[0];
  prompt.start();

  prompt.get(['stack', 'amount'], (err, data) => {
    // if(err) {
    //   throw new Error(err);
    // }
    let stack = data.stack;
    let amount = data.amount;

    if(checkChoices(stack, amount, payload[1])) {
      socket.emit('move', [gameID, stack, amount]);
    }
    else {
      showPrompt(payload);
    }
  });
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


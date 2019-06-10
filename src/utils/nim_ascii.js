'use strict';

const figlet = require('figlet');

module.exports = figlet('Nim', function(err, data) {
  if (err) {
    console.log('Something went wrong...');
    console.dir(err);
    return;
  }
  console.log(data);
});

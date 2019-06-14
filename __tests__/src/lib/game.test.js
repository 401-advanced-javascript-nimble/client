const Game = require('../../../src/lib/game.js');

describe('Game', () => {
  xit('can create a game instance', () => {
    const game = new Game();
    expect(game).toBeInstanceOf(Game);
  });
});

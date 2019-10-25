import {gameState, GameState} from '../src/game_state';

describe('gameState', () => {
  describe('called without arguments, it returns an initial game state', () => {
    let state: GameState;
    beforeEach(() => {
      state = gameState();
    });

    it('which is defined', () => {
      // Kind of a useless test in TypeScript,
      // but I suppose there should be something
      expect(state).toBeDefined();
    });
  });
});

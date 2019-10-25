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

  describe('called without a current player score', () => {
    it('returns the same state', () => {
      const initState = gameState();
      const someState: GameState = {};

      let retState = gameState(initState);
      expect(retState).toBe(initState);

      retState = gameState(someState);
      expect(retState).toBe(someState);
    });
  });

  describe('called with invalid player score', () => {
    const state = gameState();

    it('throws an error', () => {
      [-1, 5, 1.5].forEach(score => {
        expect(() => {
          gameState(state, score);
        }).toThrow(Error);
      });
    });
  });
});

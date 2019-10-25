import {gameState, GameState, Team} from '../src/game_state';

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

    it('with the away team having zero points', () => {
      expect(state.away).toBe(0);
    });

    it('with the home team having zero points', () => {
      expect(state.home).toBe(0);
    });

    it('with the current team being away', () => {
      expect(state.turn.team).toBe(Team.Away);
    });
  });

  describe('called with invalid game state', () => {
    const initState = gameState();

    it('throws an error when away team score is negative', () => {
      expect(() => {
        gameState({...initState, away: -1});
      }).toThrow(Error);
    });

    it('throws an error when home team score is negative', () => {
      expect(() => {
        gameState({...initState, home: -1});
      }).toThrow(Error);
    });
  });

  describe('called without a current player score', () => {
    it('returns the same state', () => {
      const initState = gameState();
      const someState: GameState = {
        away: 5,
        home: 2,
        turn: {
          team: Team.Home,
        }
      };

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

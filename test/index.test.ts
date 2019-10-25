import {Sportsball, ScoredGameState} from '../src';

const fakeReducerConstant = (_state?: ScoredGameState, _score?: number) => ({
  away: 999,
  home: 999
});

const fakeReducerFixed = (state: ScoredGameState) =>
  (_state?: ScoredGameState, _score?: number) => state;

// Increments away team score by two, and home team score by one
const fakeReducerCounter = (state?: ScoredGameState, _score?: number) => {
  if(!state) return {away: 0, home: 0};
  return {away: state.away + 2, home: state.home + 1};
};

describe('Sportsball', () => {
  describe('#getScore', () => {
    it('is defined', () => {
      const game = new Sportsball(fakeReducerConstant);

      expect(game.getScore).toBeDefined();
    });

    it('returns score string with home and away scores', () => {
      // Check with a constant game state result
      let game = new Sportsball(fakeReducerConstant);

      expect(game.getScore()).toEqual('Home: 999 Away: 999');

      // Check with some arbitrary game states, using a fixed result
      const testStates = [
        {away: 0, home: 0},
        {away: 0, home: 3},
        {away: 2, home: 0},
        {away: 4, home: 1}
      ];

      testStates.forEach(state => {
        game = new Sportsball(fakeReducerFixed(state));

        expect(game.getScore()).toEqual(`Home: ${state.home} Away: ${state.away}`);
      });
    });

    it('returns score string impacted by number of entries', () => {
      const game = new Sportsball(fakeReducerCounter);

      expect(game.getScore()).toEqual('Home: 0 Away: 0');

      // Somehow ES6 lacks a non-hacky way to do this...
      for(let i = 1; i <= 10; i++) {
        game.addEntry();

        expect(game.getScore()).toEqual(`Home: ${i} Away: ${i * 2}`);
      }
    });
  });

  describe('#addEntry', () => {
    it('is defined', () => {
      const game = new Sportsball(fakeReducerConstant);
      expect(game.addEntry).toBeDefined();
    });
  });
});

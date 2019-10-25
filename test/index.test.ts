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

// Adds player score to away team, and 2 times player score to home team
const fakeReducerAdder = (state?: ScoredGameState, score?: number) => {
  if(!state) return {away: 0, home: 0};
  return {away: state.away + score, home: state.home + score * 2};
};

// For checking the explicit interaction of Sportsball with the reducer
const mockReducer = jest.fn<ScoredGameState, [ScoredGameState?, number?]>(fakeReducerConstant);

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
        game.addEntry(1); // score here doesn't matter to the reducer

        expect(game.getScore()).toEqual(`Home: ${i} Away: ${i * 2}`);
      }
    });

    it('returns score string impacted by value of entries', () => {
      const game = new Sportsball(fakeReducerAdder);

      expect(game.getScore()).toEqual('Home: 0 Away: 0');

      let sum = 0;
      [1, 3, 2, 0, 0, 3, 4, 0, 1].forEach(score => {
        sum += score;

        game.addEntry(score);

        expect(game.getScore()).toEqual(`Home: ${sum * 2} Away: ${sum}`);
      });
    });
  });

  describe('#addEntry', () => {
    it('is defined', () => {
      const game = new Sportsball(fakeReducerConstant);
      expect(game.addEntry).toBeDefined();
    });
  });

  describe('interaction with reducer', () => {
    const entries = [3, 0, 0, 3, 1, 4, 2, 4];
    let game;
    beforeEach(() => {
      mockReducer.mockClear();
      game = new Sportsball(mockReducer);

      // Use all of the functionality at least once
      entries.forEach(e => game.addEntry(e));
      game.getScore();
    });

    it('calls the reducer once without arguments', () => {
      expect(mockReducer).toHaveBeenCalled();
      expect(mockReducer).toHaveBeenNthCalledWith(1);
    });

    it('calls the reducer once for each entry', () => {
      // Plus one for the initial call without arguments
      expect(mockReducer).toHaveBeenCalledTimes(entries.length + 1);
    });

    it('passes in the previous return value as state', () => {
      const calls = mockReducer.mock.calls.slice(1); // Skip first call
      const results = mockReducer.mock.results;

      calls.forEach((args, nth) => {
        const state = args[0];

        expect(state).toEqual(results[nth].value);
      });
    });

    it('passes in the entry\'s value as score', () => {
      const calls = mockReducer.mock.calls.slice(1); // Skip first call

      calls.forEach((args, nth) => {
        const score = args[1];

        expect(score).toEqual(entries[nth]);
      });
    });
  });
});

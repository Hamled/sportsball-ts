import {Sportsball, ScoredGameState} from '../src';

const fakeReducerConstant = (_state?: ScoredGameState, _score?: number) => ({
  away: 999,
  home: 999
});

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
    });
  });
});

import {Sportsball} from '../src/sportsball';

describe('Sportsball', () => {
  it('is defined', () => {
    expect(Sportsball).toBeDefined();
  });

  describe('#addEntry', () => {
    it('is defined', () => {
      expect(new Sportsball().addEntry).toBeDefined();
    });
  });

  describe("#getScore", () => {
    it('is defined', () => {
      expect(new Sportsball().getScore).toBeDefined();
    });

    it('with no turns it returns score of 0-0', () => {
      expect(new Sportsball().getScore()).toEqual('Home: 0 Away: 0');
    });
  });
});

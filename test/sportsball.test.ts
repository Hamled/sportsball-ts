import {Sportsball} from '../src/sportsball';

describe('Sportsball', () => {
  it('is defined', () => {
    expect(Sportsball).toBeDefined();
  });

  describe("#getScore", () => {
    it('is defined', () => {
      expect(new Sportsball().getScore).toBeDefined();
    });
  });
});

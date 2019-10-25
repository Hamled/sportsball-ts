import {Sportsball} from '../src';

describe('Sportsball', () => {
  describe('#getScore', () => {
    it('is defined', () => {
      const game = new Sportsball();

      expect(game.getScore).toBeDefined();
    });
});

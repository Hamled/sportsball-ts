import {Sportsball, TurnResult} from '../src/sportsball';

describe('Sportsball', () => {
  it('is defined', () => {
    expect(Sportsball).toBeDefined();
  });

  describe('#addEntry', () => {
    it('is defined', () => {
      expect(new Sportsball().addEntry).toBeDefined();
    });

    it('accepts the turn result as a parameter', () => {
      const result = TurnResult.HOME_RUN;
      expect(() => {
        new Sportsball().addEntry(result);
      }).not.toThrowError();
    });
  });

  describe("#getScore", () => {
    it('is defined', () => {
      expect(new Sportsball().getScore).toBeDefined();
    });

    it('with no turns it returns score of 0-0', () => {
      expect(new Sportsball().getScore()).toEqual('Home: 0 Away: 0');
    });

    it('with 1 home run it returns score of 0-1', () => {
      const sb = new Sportsball();
      sb.addEntry(TurnResult.HOME_RUN);

      expect(sb.getScore()).toEqual('Home: 0 Away: 1');
    });

    it('scores outs and home runs', () => {
      const sb = new Sportsball();
      sb.addEntry(TurnResult.OUT);
      sb.addEntry(TurnResult.OUT);
      sb.addEntry(TurnResult.HOME_RUN);
      sb.addEntry(TurnResult.OUT);
      // Away -> 2 runs
      sb.addEntry(TurnResult.OUT);
      sb.addEntry(TurnResult.OUT);
      sb.addEntry(TurnResult.HOME_RUN);
      sb.addEntry(TurnResult.OUT);
      // Home -> 3 runs

      // Away scores again
      sb.addEntry(TurnResult.HOME_RUN);
      sb.addEntry(TurnResult.HOME_RUN);

      expect(sb.getScore()).toEqual('Home: 1 Away: 3');
    });
  });
});

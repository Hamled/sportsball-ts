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

    it('scores singles, doubles, and triples', () => {
      const sb = new Sportsball();
      // If one player is on base, a triple scores
      sb.addEntry(TurnResult.SINGLE);
      sb.addEntry(TurnResult.TRIPLE);
      expect(sb.getScore()).toEqual('Home: 0 Away: 1');

      // If two players are on base, a double scores
      sb.addEntry(TurnResult.SINGLE);
      sb.addEntry(TurnResult.DOUBLE);
      expect(sb.getScore()).toEqual('Home: 0 Away: 2');

      // If bases are loaded, a single scores
      sb.addEntry(TurnResult.SINGLE);
      sb.addEntry(TurnResult.SINGLE);
      expect(sb.getScore()).toEqual('Home: 0 Away: 3');
    });
  });
});

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

    it('scores no entries', () => {
      expect(new Sportsball().getScore()).toEqual('Home: 0 Away: 0');
    });

    it('scores home runs', () => {
      const sb = new Sportsball();
      sb.addEntry(TurnResult.HOME_RUN);

      expect(sb.getScore()).toEqual('Home: 0 Away: 1');
    });

    it('scores outs', () => {
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

    it('scores multiple runs batted in', () => {
      const sb = new Sportsball();
      // If bases are loaded, home run scores 4
      sb.addEntry(TurnResult.TRIPLE);
      sb.addEntry(TurnResult.DOUBLE);
      sb.addEntry(TurnResult.SINGLE);
      sb.addEntry(TurnResult.HOME_RUN);
      expect(sb.getScore()).toEqual('Home: 0 Away: 4');

      // If bases are loaded, triple scores 3
      sb.addEntry(TurnResult.TRIPLE);
      sb.addEntry(TurnResult.DOUBLE);
      sb.addEntry(TurnResult.SINGLE);
      sb.addEntry(TurnResult.TRIPLE);
      expect(sb.getScore()).toEqual('Home: 0 Away: 7');

      // If bases are loaded, double scores 2
      sb.addEntry(TurnResult.DOUBLE);
      sb.addEntry(TurnResult.SINGLE);
      sb.addEntry(TurnResult.DOUBLE);
      expect(sb.getScore()).toEqual('Home: 0 Away: 9');
    });

    it('scores complete game', () => {
      const sb = new Sportsball();
      const testGame = [
        // First inning: 0-0
        [1, 0, 3, 2, 0, 3, 0,  // Away team -> 3 runs
        0, 1, 1, 1, 4, 0, 0], // Home team -> 4 runs
        // Second inning: 4-3
        [0, 0, 1, 2, 1, 1, 0,  // Away team -> 1 run
        4, 0, 0, 0         ], // Home team -> 1 run
        // Third inning: 5-4
        [0, 1, 2, 4, 0, 3, 0,  // Away team -> 3 runs
        2, 0, 4, 1, 0, 3, 0], // Home team -> 3 runs
        // Fourth inning: 8-7
        [0, 2, 3, 0, 4, 0,     // Away team -> 3 runs
        4, 4, 2, 1, 4, 2, 3,
        1, 0, 3, 1, 0, 0   ], // Home team -> 8 runs
        // Fifth inning: 16-10
        [2, 3, 3, 0, 1, 3, 4,
        0, 2, 1, 2, 0,        // Away team -> 7 runs
        1, 3, 0, 2, 0, 0   ], // Home team -> 1 run
        // Sixth inning: 17-17
        [2, 3, 0, 1, 0, 3, 3,
        2, 3, 0,              // Away team -> 6 runs
        3, 4, 2, 1, 0, 4, 1,
        3, 2, 2, 0, 0      ], // Home team -> 7 runs
        // Seventh inning: 24-23
        [0, 1, 3, 0, 2, 3, 3,
        0,                    // Away team -> 4 runs
        4, 0, 0, 4, 0      ], // Home team -> 2 runs
        // Eigth inning: 26-27
        [3, 3, 2, 2, 1, 1, 4,
        0, 0, 3, 1, 4, 1, 0,  // Away team -> 10 runs
        2, 2, 4, 1, 1, 2, 2,
        2, 0, 4, 2, 4, 0, 0], // Home team -> 11 runs
        // Ninth inning: 37-37
        [2, 4, 2, 0, 4, 4, 1,
        0, 0,                 // Away team -> 5 runs
        2, 0, 2, 0, 1, 4, 2,
        4, 2, 1, 4, 3, 0   ], // Home team -> 9 runs
        // Final score: 46-42 - Home team wins
      ];

      const flatten = (arrays: any[]): any[] => [].concat.apply([], arrays);

      flatten(testGame).forEach(score => {
        sb.addEntry(score);
      });

      expect(sb.getScore()).toEqual('Home: 46 Away: 42');
    });
  });
});

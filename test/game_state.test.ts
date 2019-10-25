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

    it('with the bases being empty', () => {
      expect(state.turn.bases.every(b => !b)).toBeTruthy();
    });

    it('with the number of outs being zero', () => {
      expect(state.turn.outs).toBe(0);
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

    it('throws an error when bases is not three booleans', () => {
      [
        [], // No bases
        [false], // One base
        [true, true], // Two bases
        [false, true, true, false] // Too many bases
      ].forEach(bases => {
        expect(() => {
          gameState({...initState, turn: {...initState.turn, bases}});
        }).toThrow(Error);
      });
    });

    it('throws an error when outs is negative or above 2', () => {
      [-1, 3].forEach(outs => {
        expect(() => {
          gameState({...initState, turn: {...initState.turn, outs}});
        }).toThrow(Error);
      });
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
          bases: [false, true, true],
          outs: 1
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

  // Helper functions
  const teamName = (team: Team): string => {
    return team == Team.Home ? 'home' : 'away';
  };

  const teamScore = (state: GameState, team: Team): number => {
    return team == Team.Home ? state.home : state.away;
  };

  const withBases = (state: GameState, bases: boolean[]): GameState => {
    return {...state, turn: {...state.turn, bases}};
  };

  const testCases = [gameState(), {
    away: 1, home: 3, turn: {team: Team.Home, bases: [], outs: 2}
  },{
    away: 9, home: 2, turn: {team: Team.Away, bases: [], outs: 1}
  }];

  const scoringTestSuite = (playerScore: number) =>
    (bases: boolean[], addPoints: number, {newBases, basesTestName}): void => {
      testCases.map(s => withBases(s, bases)).forEach(state => {
        describe(`when away is ${state.away} and home is ${state.home}`, () => {
          const prevTeam = state.turn.team;

          it(`adds ${addPoints} to current team (${teamName(state.turn.team)}) score`, () => {
            const prevScore = teamScore(state, prevTeam);

            const newState = gameState(state, playerScore);

            expect(teamScore(newState, prevTeam)).toEqual(prevScore + addPoints);
          });

          it('does not change non-current team score', () => {
            const otherTeam = prevTeam == Team.Home ? Team.Away : Team.Home;
            const prevScore = teamScore(state, otherTeam);

            const newState = gameState(state, playerScore);

            expect(teamScore(newState, otherTeam)).toEqual(prevScore);
          });

          it('keeps same team current', () => {
            const newState = gameState(state, playerScore);

            expect(newState.turn.team).toEqual(state.turn.team);
          });

          it(basesTestName, () => {
            const newState = gameState(state, playerScore);

            expect(newState.turn.bases).toEqual(newBases);
          });
        });
      });
    };

  describe('called with player score of 4', () => {
    const scoring4TestSuite = scoringTestSuite(4);
    const newBasesDesc = {
      newBases: [false, false, false],
      basesTestName: 'clears all bases'
    };

    describe('when bases are empty', () => {
      scoring4TestSuite([false, false, false], 1, newBasesDesc);
    });

    describe('when bases are loaded', () => {
      scoring4TestSuite([true, true, true], 4, newBasesDesc);
    });

    describe('when one player on base', () => {
      const basesStates = [
        [true, false, false],
        [false, true, false],
        [false, false, true]
      ];

      basesStates.forEach(bases => {
        scoring4TestSuite(bases, 2, newBasesDesc);
      });
    });

    describe('when two players on base', () => {
      const basesStates = [
        [true, true, false],
        [true, false, true],
        [false, true, true]
      ];

      basesStates.forEach(bases => {
        scoring4TestSuite(bases, 3, newBasesDesc);
      });
    });
  });

  describe('called with player score of 3', () => {
    const scoring3TestSuite = scoringTestSuite(3);
    const newBasesDesc = {
      newBases: [false, false, true],
      basesTestName: 'has player on third base'
    };

    describe('when bases are empty', () => {
      scoring3TestSuite([false, false, false], 0, newBasesDesc);
    });

    describe('when bases are loaded', () => {
      scoring3TestSuite([true, true, true], 3, newBasesDesc);
    });

    describe('when one player on base', () => {
      const basesStates = [
        [true, false, false],
        [false, true, false],
        [false, false, true]
      ];

      basesStates.forEach(bases => {
        scoring3TestSuite(bases, 1, newBasesDesc);
      });
    });

    describe('when two players on base', () => {
      const basesStates = [
        [true, true, false],
        [true, false, true],
        [false, true, true]
      ];

      basesStates.forEach(bases => {
        scoring3TestSuite(bases, 2, newBasesDesc);
      });
    });
  });

  describe('called with player score of 2', () => {
    const scoring2TestSuite = scoringTestSuite(2);

    describe('when bases are empty', () => {
      scoring2TestSuite([false, false, false], 0, {
        newBases: [false, true, false],
        basesTestName: 'has player on second'
      });
    });

    describe('when bases are loaded', () => {
      scoring2TestSuite([true, true, true], 2, {
        newBases: [false, true, true],
        basesTestName: 'has players on second and third'
      });
    });

    describe('when one player on base', () => {
      const basesStates = [
        [true, false, false],
        [false, true, false],
        [false, false, true]
      ];

      basesStates.forEach(bases => {
        scoring2TestSuite(bases, 0, {
          newBases: [false, true, true],
          basesTestName: 'has players on second and third'
        });
      });
    });

    describe('when two players on base', () => {
      const basesStates = [
        [true, true, false],
        [true, false, true],
        [false, true, true]
      ];

      basesStates.forEach(bases => {
        scoring2TestSuite(bases, 1, {
          newBases: [false, true, true],
          basesTestName: 'has players on second and third'
        });
      });
    });
  });

  describe('called with player score of 1', () => {
    const scoring1TestSuite = scoringTestSuite(1);

    describe('when bases are empty', () => {
      scoring1TestSuite([false, false, false], 0, {
        newBases: [true, false, false],
        basesTestName: 'has player on first'
      });
    });

    describe('when bases are loaded', () => {
      scoring1TestSuite([true, true, true], 1, {
        newBases: [true, true, true],
        basesTestName: 'has bases loaded'
      });
    });

    describe('when one player on base', () => {
      const basesOutcomes = [
        [[true, false, false], [true, true, false], 'has players on first and second'],
        [[false, true, false], [true, true, false], 'has players on first and second'],
        [[false, false, true], [true, false, true], 'has players on first and third']
      ];

      basesOutcomes.forEach((testCase) => {
        const [bases, newBases, basesTestName] = testCase;
        scoring1TestSuite(bases as boolean[], 0, {newBases, basesTestName});
      });
    });

    describe('when two players on base', () => {
      const basesStates = [
        [true, true, false],
        [true, false, true],
        [false, true, true]
      ];

      basesStates.forEach(bases => {
        scoring1TestSuite(bases, 0, {
          newBases: [true, true, true],
          basesTestName: 'has bases loaded'
        });
      });
    });
  });
});

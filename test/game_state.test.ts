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

  describe('called with player score of 4', () => {
    const playerScore = 4;

    const states = [gameState(), {
      away: 1, home: 3, turn: {team: Team.Home, bases: []}
    },{
      away: 9, home: 2, turn: {team: Team.Away, bases: []}
    }];

    const scoring4TestSuite = (bases: boolean[], addPoints: number): void => {
      states.map(s => withBases(s, bases)).forEach(state => {
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

          it('clears the bases', () => {
            const newState = gameState(state, playerScore);

            expect(newState.turn.bases).toEqual([false, false, false]);
          });
        });
      });
    };

    describe('when bases are empty', () => {
      scoring4TestSuite([false, false, false], 1); // Should add one point
    });

    describe('when bases are loaded', () => {
      scoring4TestSuite([true, true, true], 4); // Should add four points
    });

    describe('when one player on base', () => {
      const basesStates = [
        [true, false, false],
        [false, true, false],
        [false, false, true]
      ];

      basesStates.forEach(bases => {
        scoring4TestSuite(bases, 2); // Should add two points
      });
    });

    describe('when two players on base', () => {
      const basesStates = [
        [true, true, false],
        [true, false, true],
        [false, true, true]
      ];

      basesStates.forEach(bases => {
        scoring4TestSuite(bases, 3); // Should add three points
      });
    });
  });

  describe('called with player score of 3', () => {
    const playerScore = 3;

    const states = [gameState(), {
      away: 1, home: 3, turn: {team: Team.Home, bases: []}
    },{
      away: 9, home: 2, turn: {team: Team.Away, bases: []}
    }];

    const scoring3TestSuite = (bases: boolean[], addPoints: number): void => {
      states.map(s => withBases(s, bases)).forEach(state => {
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

          it('has player on third base', () => {
            const newState = gameState(state, playerScore);

            expect(newState.turn.bases).toEqual([false, false, true]);
          });
        });
      });
    };

    describe('when bases are empty', () => {
      scoring3TestSuite([false, false, false], 0); // Should add zero points
    });

    describe('when bases are loaded', () => {
      scoring3TestSuite([true, true, true], 3); // Should add three points
    });

    describe('when one player on base', () => {
      const basesStates = [
        [true, false, false],
        [false, true, false],
        [false, false, true]
      ];

      basesStates.forEach(bases => {
        scoring3TestSuite(bases, 1); // Should add one point
      });
    });

    describe('when two players on base', () => {
      const basesStates = [
        [true, true, false],
        [true, false, true],
        [false, true, true]
      ];

      basesStates.forEach(bases => {
        scoring3TestSuite(bases, 2); // Should add two points
      });
    });
  });

  describe('called with player score of 2', () => {
    const playerScore = 2;

    const states = [gameState(), {
      away: 1, home: 3, turn: {team: Team.Home, bases: []}
    },{
      away: 9, home: 2, turn: {team: Team.Away, bases: []}
    }];

    const scoring2TestSuite = (bases: boolean[], addPoints: number, newBases: boolean[]): void => {
      states.map(s => withBases(s, bases)).forEach(state => {
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

          it('has player on second base, maybe on third', () => {
            const newState = gameState(state, playerScore);

            expect(newState.turn.bases).toEqual(newBases);
          });
        });
      });
    };

    describe('when bases are empty', () => {
      scoring2TestSuite([false, false, false], 0, [false, true, false]);
    });

    describe('when bases are loaded', () => {
      scoring2TestSuite([true, true, true], 2, [false, true, true]);
    });

    describe('when one player on base', () => {
      const basesStates = [
        [true, false, false],
        [false, true, false],
        [false, false, true]
      ];

      basesStates.forEach(bases => {
        scoring2TestSuite(bases, 0, [false, true, true]);
      });
    });

    describe('when two players on base', () => {
      const basesStates = [
        [true, true, false],
        [true, false, true],
        [false, true, true]
      ];

      basesStates.forEach(bases => {
        scoring2TestSuite(bases, 1, [false, true, true]);
      });
    });
  });
});

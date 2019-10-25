import {Sportsball} from '../../src';
import {gameState} from '../../src/game_state';

describe('Sportsball integration', () => {
  let game;
  beforeEach(() => {
    game = new Sportsball(gameState);
  });

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

  it('should return a score of 0-0 after no turns', () => {
    expect(game.getScore()).toEqual('Home: 0 Away: 0');
  });
});

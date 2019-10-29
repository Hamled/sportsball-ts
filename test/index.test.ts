import {sportsball} from '../src'

describe('sportsball', () => {
  it('exists', () => expect(sportsball).toBeDefined())
  it('can be called', () => expect(sportsball).toBeInstanceOf(Function))
  describe('called', () => {
    it('returns an object', () => expect(sportsball()).toBeInstanceOf(Object))
    it('has an addEntry method', () => expect(sportsball().addEntry).toBeInstanceOf(Function))
    it('has a getScore method', () => expect(sportsball().getScore).toBeInstanceOf(Function))
    describe('getScore', () => {
      it('scores 0 points for no entries', () => {
        const sb = sportsball()

        expect(sb.getScore()).toEqual('Home: 0 Away: 0')
      })
      it('scores 1 point for a home run', () => {
        const sb = sportsball()
        sb.addEntry(4)
        sb.addEntry(2)

        expect(sb.getScore()).toEqual('Home: 0 Away: 1')
      })
      it('scores 1 point for anything followed by a triple', () => {
        const sb = sportsball()
        sb.addEntry(1)
        sb.addEntry(3)

        expect(sb.getScore()).toEqual('Home: 0 Away: 1')
      })
      it('scores 1 point for two entries followed by a double', () => {
        const sb = sportsball()
        sb.addEntry(1)
        sb.addEntry(1)
        sb.addEntry(2)

        expect(sb.getScore()).toEqual('Home: 0 Away: 1')
      })
      it('scores 1 point for three entries followed by a single', () => {
        const sb = sportsball()
        sb.addEntry(1)
        sb.addEntry(1)
        sb.addEntry(1)
        sb.addEntry(1)

        expect(sb.getScore()).toEqual('Home: 0 Away: 1')
      })
      it('scores even frames for home team', () => {
        const sb = sportsball()
        sb.addEntry(0)
        sb.addEntry(0)
        sb.addEntry(0)
        sb.addEntry(4)

        expect(sb.getScore()).toEqual('Home: 1 Away: 0')
      })

      // Additional tests
      const zeroPointFrames = [
        // Non-point suffixes
        [], [1], [2], [2,1], [1,1],
        // point suffixes
        [3], [3,2], [3,2,1], [3,1], [3,1,1],
        [2,2], [2,2,1], [2,1,1],
        [1,2], [1,2,1], [1,1,1]
      ]
      it('scores frames with 0 points', () => {
        zeroPointFrames.forEach(frame => {
          const sb = sportsball()
          frame.forEach(e => sb.addEntry(e))

          expect(sb.getScore()).toEqual('Home: 0 Away: 0')
        })
      })
      const eachPermutation = (n, f) => {
        for(let i = 0; i < Math.pow(4, n); i++) {
          const perm = []
          for(let d = 0; d < n; d++) {
            perm.unshift(Math.floor(i / Math.pow(4, d)) % 4 + 1)
          }
          f(perm)
        }
      }
      const maxPoints = 5
      for(let points = 1; points <= maxPoints; points++) {
        it(`scores frames with ${points} points`, () => {
          const npSuffixes = zeroPointFrames.slice(0, 5)
          const  pSuffixes = zeroPointFrames.slice(5)
          const checkFrame = frame => {
            const sb = sportsball()
            frame.forEach(e => sb.addEntry(e))

            expect(sb.getScore()).toEqual(`Home: 0 Away: ${points}`)
          }

          eachPermutation(points, prefix => {
            npSuffixes.map(s => [4, ...s]).forEach(suffix => {
              checkFrame(prefix.slice(0, points - 1).concat(suffix))
            })

            pSuffixes.forEach(suffix => checkFrame(prefix.concat(suffix)))
          })
        })
      }

      it('scores complete game', () => {
        const sb = sportsball()
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
        ]

        const flatten = (arrays: any[]): any[] => [].concat.apply([], arrays)

        flatten(testGame).forEach(score => {
          sb.addEntry(score)
        })

        expect(sb.getScore()).toEqual('Home: 46 Away: 42')
      })
    })
  })
})

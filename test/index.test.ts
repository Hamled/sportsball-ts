import {sportsball} from '../src';

describe('sportsball', () => {
  it('exists', () => expect(sportsball).toBeDefined())
  it('can be called', () => expect(sportsball).toBeInstanceOf(Function))
  describe('called', () => {
    it('returns an object', () => expect(sportsball()).toBeInstanceOf(Object))
    it('has addEntry method', () => expect(sportsball().addEntry).toBeInstanceOf(Function))
    it('has getScore method', () => expect(sportsball().getScore).toBeInstanceOf(Function))
    describe('getScore', () => {
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
    })
  })
})

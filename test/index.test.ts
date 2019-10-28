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
    })
  })
})

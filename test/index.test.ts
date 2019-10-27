const sportsball = () => ({
  getScore() {},
  addEntry() {},
})
describe('sportsball', () => {
  it('exists', () => expect(sportsball).toBeDefined())
  it('returns something', () => expect(sportsball()).toBeDefined())
  describe('called', () => {
    it('returns getScore method', () => expect(sportsball().getScore).toBeDefined())
    describe('getScore method', () => {
      const zeroPointFrames = [
        [],
        [3],
        [3,2],
        [3,2,1],
        [3,1],
        [3,1,1],
        [2],
        [2,2],
        [2,2,1],
        [2,1],
        [2,1,1],
        [1],
        [1,2],
        [1,2,1],
        [1,1],
        [1,1,1],
      ]
      it('scores all frames with 0 points', () => {
        zeroPointFrames.forEach(frame => {
          const sb = sportsball()
          frame.forEach(e => sb.addEntry(e))
          expect(sb.getScore()).toEqual('Home: 0 Away: 0')
        })
      })
    })
    it('returns addEntry method', () => expect(sportsball().addEntry).toBeDefined())
  })
})

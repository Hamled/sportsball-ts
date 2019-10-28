const sportsball = () => {
  const entries = []
  return {
    getScore() {
      const points = entries.reduce(({points,max}, entry, i) => {
        if(points > 0 || entry == 4 || max + 1 > 3) return {points: points + 1, max}
        if(entry > max) return {points, max: entry}
        return {points, max: max + 1}
      }, {points: 0, max: 0}).points
      return `Home: 0 Away: ${points}`
    },
    addEntry(entry) {
      entries.unshift(entry)
    },
  }
}
describe('sportsball', () => {
  it('exists', () => expect(sportsball).toBeDefined())
  it('returns something', () => expect(sportsball()).toBeDefined())
  describe('called', () => {
    it('returns getScore method', () => expect(sportsball().getScore).toBeDefined())
    describe('getScore method', () => {
      const zeroPointFrames = [
        // Non-point suffixes
        [],[1],[2],[1,1],[2,1],
        // Point suffixes (at index 5)
                  [1,2],[1,1,1],[1,2,1],
                  [2,2],[2,1,1],[2,2,1],
        [3],[3,1],[3,2],[3,1,1],[3,2,1],
      ]
      it('scores all frames with 0 points', () => {
        zeroPointFrames.forEach(frame => {
          const sb = sportsball()
          frame.forEach(e => sb.addEntry(e))
          expect(sb.getScore()).toEqual('Home: 0 Away: 0')
        })
      })
      const permutations = (n, f) => {
        for(let p = 0; p < Math.pow(4, n); p++) {
          let perm = []
          for(let i = 0; i < n; i++) {
            perm.unshift(Math.floor(p / Math.pow(4, i)) % 4 + 1)
          }
          f(perm, n)
        }
      }
      const npSuffixes = zeroPointFrames.slice(0, 5)
      const  pSuffixes = zeroPointFrames.slice(5)
      const  maxPoints = 5
      for(let i = 1; i <= maxPoints; i++) {
        it(`scores all frames with ${i} point(s)`, () => {
          permutations(i, frame => {
            npSuffixes.forEach(suffix => {
              const sb = sportsball()
              const prefix = frame.slice(0, i-1);
              [...prefix, 4, ...suffix].forEach(e => sb.addEntry(e))
              expect(sb.getScore()).toEqual(`Home: 0 Away: ${i}`)
            })
            pSuffixes.forEach(suffix => {
              const sb = sportsball()
              frame.concat(suffix).forEach(e => sb.addEntry(e))
              expect(sb.getScore()).toEqual(`Home: 0 Away: ${i}`)
            })
          })
        })
      }
      it('scores odd frames for away, even for home', () => {
        const sb = sportsball();
        [
          4,0,0,0,
          4,0,0,0,
          4,4,
        ].forEach(e => sb.addEntry(e))
        expect(sb.getScore()).toEqual(`Home: 1 Away: 3`)
      })
    })
    it('returns addEntry method', () => expect(sportsball().addEntry).toBeDefined())
  })
})

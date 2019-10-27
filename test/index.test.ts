class Sportsball {
  getScore() {return 'Home: 0 Away: 0'}
  addEntry(_entry) {}
}
describe('Sportsball', () => {
  it('exists', () => expect(Sportsball).toBeDefined())
  it('can be constructed', () => expect(new Sportsball()).toBeDefined())
  describe('constructed', () => {
    it('has #getScore method', () => expect(new Sportsball().getScore).toBeDefined())
    describe('#getScore', () => {
      const expectScore = (score: number, entries: number[]) => {
        const sb = new Sportsball()
        entries.map(e => sb.addEntry(e))
        expect(sb.getScore()).toEqual(`Home: 0 Away: ${score}`)
      }
      it('scores frames with no points', () => {
        [
          [],
          [3],
          [2],
          [1],
          [3,2],
          [3,1],
          [2,2],
          [2,1],
          [1,2],
          [1,1],
          [3,2,1],
          [3,1,1],
          [2,2,1],
          [2,1,1],
          [1,2,1],
          [1,1,1]
        ].forEach(entries => expectScore(0, entries))
      })
    })
    it('has #addEntry method', () => expect(new Sportsball().addEntry).toBeDefined())
  })
})

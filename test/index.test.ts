const sportsball = () => ({
  getScore() {},
  addEntry() {},
})
describe('sportsball', () => {
  it('exists', () => expect(sportsball).toBeDefined())
  it('returns something', () => expect(sportsball()).toBeDefined())
  describe('called', () => {
    it('returns getScore method', () => expect(sportsball().getScore).toBeDefined())
    it('returns addEntry method', () => expect(sportsball().addEntry).toBeDefined())
  })
})

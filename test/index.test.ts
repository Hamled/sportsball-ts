class Sportsball {}
describe('Sportsball', () => {
  it('exists', () => expect(Sportsball).toBeDefined())
  it('can be constructed', () => expect(new Sportsball()).toBeDefined())
  describe('constructed', () => {
    it('has #getScore method', () => expect(new Sportsball().getScore).toBeDefined())
  })
})

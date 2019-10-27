import {Sportsball} from '../src/sportsball';

describe('Sportsball', () => {
  it('exists', () => expect(Sportsball).toBeDefined())
  it('can be constructed', () => expect(new Sportsball()).toBeDefined())
  it('has getScore method', () => expect(new Sportsball().getScore).toBeDefined())
  describe('#getScore', () => {
    it('scores a tie game with no points', () => {
      expect((new Sportsball).getScore()).toEqual('Home: 0 Away: 0')
    })
  })
})

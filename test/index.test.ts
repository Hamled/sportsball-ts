import {sportsball} from '../src';

describe('sportsball', () => {
  it('exists', () => expect(sportsball).toBeDefined())
  it('can be called', () => expect(sportsball).toBeInstanceOf(Function))
  describe('called', () => {
    it('returns an object', () => expect(sportsball()).toBeInstanceOf(Object))
    it('has addEntry method', () => expect(sportsball().addEntry).toBeInstanceOf(Function))
    it('has getScore method', () => expect(sportsball().getScore).toBeInstanceOf(Function))
  })
})

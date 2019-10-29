import {sportsball} from '../src'

describe('sportsball', () => {
  it('exists', () => expect(sportsball).toBeDefined())
  it('can be called', () => expect(sportsball).toBeInstanceOf(Function))
  it('returns an object', () => expect(sportsball()).toBeInstanceOf(Object))
  it('has a getScore method', () => expect(sportsball().getScore).toBeInstanceOf(Function))
})

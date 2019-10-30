import {sportsball} from '../src'

describe('sportsball', () => {
  it('returns an object', () => expect(sportsball()).toBeInstanceOf(Object))
  it('has a getScore method', () => expect(sportsball().getScore).toBeInstanceOf(Function))
})

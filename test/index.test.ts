import {sportsball} from '../src'

describe('sportsball', () => {
  it('exists', () => expect(sportsball).toBeDefined())
  it('can be called', () => expect(sportsball).toBeInstanceOf(Function))
  it('can be called with number of bases', () => expect(() => sportsball(3)).not.toThrowError())
})

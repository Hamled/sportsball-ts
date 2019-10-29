import {sportsball} from '../src'

describe('sportsball', () => {
  it('exists', () => expect(sportsball).toBeDefined())
  it('can be called', () => expect(sportsball).toBeInstanceOf(Function))
  describe('called', () => {
    it('returns an object', () => expect(sportsball(0)).toBeInstanceOf(Object))
    it('has an addEntry method', () => expect(sportsball(0).addEntry).toBeInstanceOf(Function))
    it('has a getScore method', () => expect(sportsball(0).getScore).toBeInstanceOf(Function))
    describe('getScore', () => {
      it('scores frames with no entries', () => {
        const sb = sportsball(0);

        expect(sb.getScore()).toEqual('Home: 0 Away: 0')
      })
    })
  })
  it('can be called with number of bases', () => expect(() => sportsball(3)).not.toThrowError())
})

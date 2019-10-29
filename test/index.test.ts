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
        const sb = sportsball(0)

        expect(sb.getScore()).toEqual('Home: 0 Away: 0')
      })
    })
  })
  it('can be called with number of bases', () => expect(() => sportsball(3)).not.toThrowError())
  describe('called with 3 bases', () => {
    describe('getScore', () => {
      it('scores frames including home runs', () => {
        const sb = sportsball(3)
        sb.addEntry(4)

        expect(sb.getScore()).toEqual('Home: 0 Away: 1')
      })
      it('scores frames including triples', () => {
        const sb = sportsball(3)
        sb.addEntry(3)
        sb.addEntry(3)

        expect(sb.getScore()).toEqual('Home: 0 Away: 1')
      })
    })
  })
})

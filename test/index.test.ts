import {sportsball} from '../src'

describe('sportsball',() => {
  it('exists', () => expect(sportsball).toBeDefined())
  it('can be called', () => expect(sportsball).toBeInstanceOf(Function))
  it('accepts optional number of bases', () => expect(sportsball(5)).toBeDefined())
  describe('called with 3 bases', () => {
    it('returns an object', () => expect(sportsball()).toBeInstanceOf(Object))
    it('has an addEntry method', () => expect(sportsball().addEntry).toBeInstanceOf(Function))
    it('has a getScore method', () => expect(sportsball().getScore).toBeInstanceOf(Function))
    describe('getScore', () => {
      it('scores frames including no turns', () => {
        const sb = sportsball()

        expect(sb.getScore()).toEqual('Home: 0 Away: 0')
      })
      it('scores frames including home runs', () => {
        const sb = sportsball()
        sb.addEntry(4)

        expect(sb.getScore()).toEqual('Home: 0 Away: 1')
      })
      it('scores frames including triples', () => {
        const sb = sportsball()
        sb.addEntry(3)
        sb.addEntry(3)

        expect(sb.getScore()).toEqual('Home: 0 Away: 1')
      })
      it('scores frames including doubles', () => {
        const sb = sportsball()
        sb.addEntry(2)
        sb.addEntry(2)
        sb.addEntry(2)

        expect(sb.getScore()).toEqual('Home: 0 Away: 1')
      })
      it('scores frames including singles', () => {
        const sb = sportsball()
        sb.addEntry(1)
        sb.addEntry(1)
        sb.addEntry(1)
        sb.addEntry(1)

        expect(sb.getScore()).toEqual('Home: 0 Away: 1')
      })
      it('scores odd frames for home team', () => {
        const sb = sportsball()
        sb.addEntry(0)
        sb.addEntry(0)
        sb.addEntry(0)
        sb.addEntry(4)

        expect(sb.getScore()).toEqual('Home: 1 Away: 0')
      })
    })
  })
})

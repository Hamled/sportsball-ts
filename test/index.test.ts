import {sportsball} from '../src'

describe('sportsball', () => {
  it('exists', () => expect(sportsball).toBeDefined())
  it('can be called', () => expect(sportsball()).toBeDefined())
  describe('called', () => {
    it('returns an object', () => expect(sportsball()).toBeInstanceOf(Object))
    it('has an addEntry method', () => expect(sportsball().addEntry).toBeInstanceOf(Function))
    it('has a getScore method', () => expect(sportsball().getScore).toBeInstanceOf(Function))
    describe('getScore', () => {
      it('scores a frame with no entries as 0-0', () => {
        const sb = sportsball()

        expect(sb.getScore()).toEqual('Home: 0 Away: 0')
      })
      it('scores a frame with 1 home run as 0-1', () => {
        const sb = sportsball()
        sb.addEntry(4)

        expect(sb.getScore()).toEqual('Home: 0 Away: 1')
      })
      it('scores a frame including 1 triple', () => {
        const sb = sportsball()
        sb.addEntry(1)
        sb.addEntry(3)

        expect(sb.getScore()).toEqual('Home: 0 Away: 1')
      })
      it('scores a frame including 1 double', () => {
        const sb = sportsball()
        sb.addEntry(1)
        sb.addEntry(1)
        sb.addEntry(2)

        expect(sb.getScore()).toEqual('Home: 0 Away: 1')
      })
      it('scores a frame including 4 singles', () => {
        const sb = sportsball()
        sb.addEntry(1)
        sb.addEntry(1)
        sb.addEntry(1)
        sb.addEntry(1)

        expect(sb.getScore()).toEqual('Home: 0 Away: 1')
      })
      it('scores even frames for home team', () => {
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

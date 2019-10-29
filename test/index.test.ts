import {sportsball} from '../src'

describe('sportsball', () => {
  it('exists', () => expect(sportsball).toBeDefined())
  it('can be called', () => expect(sportsball).toBeInstanceOf(Function))
  describe('called', () => {
    it('returns an object', () => expect(sportsball()).toBeInstanceOf(Object))
    it('has an addEntry method', () => expect(sportsball().addEntry).toBeInstanceOf(Function))
    it('has a getScore method', () => expect(sportsball().getScore).toBeInstanceOf(Function))
    describe('getScore', () => {
      it('scores 0 points for no entries', () => {
        const sb = sportsball()

        expect(sb.getScore()).toEqual('Home: 0 Away: 0')
      })
      it('scores 1 point for a home run', () => {
        const sb = sportsball()
        sb.addEntry(4)
        sb.addEntry(2)

        expect(sb.getScore()).toEqual('Home: 0 Away: 1')
      })
      it('scores 1 point for anything followed by a triple', () => {
        const sb = sportsball()
        sb.addEntry(1)
        sb.addEntry(3)

        expect(sb.getScore()).toEqual('Home: 0 Away: 1')
      })
      it('scores 1 point for two entries followed by a double', () => {
        const sb = sportsball()
        sb.addEntry(1)
        sb.addEntry(1)
        sb.addEntry(2)

        expect(sb.getScore()).toEqual('Home: 0 Away: 1')
      })
      it('scores 1 point for three entries followed by a single', () => {
        const sb = sportsball()
        sb.addEntry(1)
        sb.addEntry(1)
        sb.addEntry(1)
        sb.addEntry(1)

        expect(sb.getScore()).toEqual('Home: 0 Away: 1')
      })
    })
  })
})

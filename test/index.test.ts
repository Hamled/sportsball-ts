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
    })
  })
})

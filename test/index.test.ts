import {sportsball} from '../src'

describe('sportsball',() => {
  it('exists', () => expect(sportsball).toBeDefined())
  it('can be called', () => expect(sportsball).toBeInstanceOf(Function))
  describe('called', () => {
    it('returns an object', () => expect(sportsball()).toBeInstanceOf(Object))
    it('has an addEntry method', () => expect(sportsball().addEntry).toBeInstanceOf(Function))
    it('has a getScore method', () => expect(sportsball().getScore).toBeInstanceOf(Function))
    describe('getScore', () => {
      it('scores frames including no turns', () => {
        const sb = sportsball()

        expect(sb.getScore()).toEqual('Home: 0 Away: 0')
      })
    })
  })
})

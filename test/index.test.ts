import {sportsball} from '../src'

describe('sportsball', () => {
  describe('getScore', () => {
    it('scores 0 points for no runners', () => {
      const sb = sportsball()

      expect(sb.getScore()).toEqual('Home: 0 Away: 0')
    })
    it('scores points for 0+ runners before home run', () => {
      const sb = sportsball();
      [3,2,1,4,3,2,1].forEach(e => sb.addEntry(e))

      expect(sb.getScore()).toEqual('Home: 0 Away: 4')
    })
    it('scores points for 1+ runners before triple', () => {
      const sb = sportsball();
      [3,2,1,3,2,1].forEach(e => sb.addEntry(e))

      expect(sb.getScore()).toEqual('Home: 0 Away: 3')
    })
  })
})

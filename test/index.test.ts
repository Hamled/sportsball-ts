import {sportsball} from '../src'

describe('sportsball', () => {
  describe('getScore', () => {
    it('scores 0 points for no runners', () => {
      const sb = sportsball()

      expect(sb.getScore()).toEqual('Home: 0 Away: 0')
    })
    it('scores points for 0+ runners before a home run', () => {
      const sb = sportsball();
      [3, 2, 1, 4, 3, 2, 1].forEach(e => sb.addEntry(e))

      expect(sb.getScore()).toEqual('Home: 0 Away: 4')
    })
    it('scores points for 1+ runners before a triple', () => {
      const sb = sportsball();
      [3, 2, 1, 3, 2, 1].forEach(e => sb.addEntry(e))

      expect(sb.getScore()).toEqual('Home: 0 Away: 3')
    })
    it('scores points for 2+ runners before a double', () => {
      const sb = sportsball();
      [3, 2, 1, 2, 1].forEach(e => sb.addEntry(e))

      expect(sb.getScore()).toEqual('Home: 0 Away: 2')
    })
    it('scores points for 3+ runners before a single', () => {
      const sb = sportsball();
      [3, 2, 1, 1].forEach(e => sb.addEntry(e))

      expect(sb.getScore()).toEqual('Home: 0 Away: 1')
    })
    it('scores even frames for home team', () => {
      const sb = sportsball();
      [0, 0, 0, 4].forEach(e => sb.addEntry(e))

      expect(sb.getScore()).toEqual('Home: 1 Away: 0')
    })
  })
})

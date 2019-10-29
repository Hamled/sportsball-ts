import {sportsball} from '../src'

describe('sportsball', () => {
  describe('getScore', () => {
    it('scores 0 points for no runners', () => {
      const sb = sportsball()

      expect(sb.getScore()).toEqual('Home: 0 Away: 0')
    })
  })
})

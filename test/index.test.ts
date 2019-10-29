import {sportsball} from '../src'

describe('sportsball', () => {
  it('has an addEntry method', () => expect(sportsball().addEntry).toBeInstanceOf(Function))
  describe('getScore', () => {
    it('scores 0 points for no runners', () => {
      const sb = sportsball()

      expect(sb.getScore()).toEqual('Home: 0 Away: 0')
    })
    it('scores 1 point for each runner preceding a home run, plus 1', () => {
      const sb = sportsball()
      sb.addEntry(3)
      sb.addEntry(2)
      sb.addEntry(1)
      sb.addEntry(4)
      sb.addEntry(3)
      sb.addEntry(2)
      sb.addEntry(1)

      expect(sb.getScore()).toEqual('Home: 0 Away: 4')
    })
    it('scores 1 point for each runner preceding a triple', () => {
      const sb = sportsball()
      sb.addEntry(3)
      sb.addEntry(2)
      sb.addEntry(1)
      sb.addEntry(3)
      sb.addEntry(2)
      sb.addEntry(1)

      expect(sb.getScore()).toEqual('Home: 0 Away: 3')
    })
    it('scores 1 point for all but 1 runner preceding a double', () => {
      const sb = sportsball()
      sb.addEntry(3)
      sb.addEntry(2)
      sb.addEntry(1)
      sb.addEntry(2)
      sb.addEntry(1)

      expect(sb.getScore()).toEqual('Home: 0 Away: 2')
    })
    it('scores 1 point for all but 2 runners preceding a single', () => {
      const sb = sportsball()
      sb.addEntry(3)
      sb.addEntry(2)
      sb.addEntry(1)
      sb.addEntry(1)

      expect(sb.getScore()).toEqual('Home: 0 Away: 1')
    })
  })
})

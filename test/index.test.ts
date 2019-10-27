import {Sportsball} from '../src/sportsball';

describe('Sportsball', () => {
  it('exists', () => expect(Sportsball).toBeDefined())
  it('can be constructed', () => expect(new Sportsball()).toBeDefined())
  it('has getScore method', () => expect(new Sportsball().getScore).toBeDefined())
  it('has addEntry method', () => expect(new Sportsball().addEntry).toBeDefined())
  describe('#getScore', () => {
    it('scores a tie game with no points', () => {
      expect((new Sportsball).getScore()).toEqual('Home: 0 Away: 0')
    })
    it('scores plays resulting in one point', () => {
      let sb = new Sportsball()
      sb.addEntry(4)
      expect(sb.getScore()).toEqual('Home: 0 Away: 1')

      sb = new Sportsball()
      sb.addEntry(1)
      sb.addEntry(3)
      expect(sb.getScore()).toEqual('Home: 0 Away: 1')

      sb = new Sportsball()
      sb.addEntry(2)
      sb.addEntry(3)
      expect(sb.getScore()).toEqual('Home: 0 Away: 1')

      sb = new Sportsball()
      sb.addEntry(3)
      sb.addEntry(3)
      expect(sb.getScore()).toEqual('Home: 0 Away: 1')
    })
  })
})

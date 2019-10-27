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
      const expectScoreOne = (entries: number[]) => {
        let sb = new Sportsball()
        entries.forEach((e) => sb.addEntry(e))
        expect(sb.getScore()).toEqual('Home: 0 Away: 1')
      }

      expectScoreOne([4])
      expectScoreOne([3,3])
      expectScoreOne([2,3])
      expectScoreOne([1,3])
      expectScoreOne([3,2,2])
      expectScoreOne([3,1,2])
      expectScoreOne([2,2,2])
      expectScoreOne([2,1,2])
      expectScoreOne([1,2,2])
      expectScoreOne([1,1,2])
      expectScoreOne([3,2,1,1])
      expectScoreOne([3,1,1,1])
      expectScoreOne([2,2,1,1])
      expectScoreOne([2,1,1,1])
      expectScoreOne([1,2,1,1])
      expectScoreOne([1,1,1,1])
    })
  })
})

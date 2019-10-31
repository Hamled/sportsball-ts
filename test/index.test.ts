import {sportsball} from '../src'

describe('sportsball', () => {
  it('has a getScore method', () => expect(sportsball().getScore).toBeInstanceOf(Function))
})

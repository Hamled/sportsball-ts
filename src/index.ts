const BASES = 3
export const sportsball = () => {
  let runners, unscored, last, outs
  let away = 0
  let home = 0
  let isAway = false

  const score = () => runners - unscored
  const runnersToNextPoint = () => BASES + 1 - last
  const resetFrame = () => {
    runners = unscored = last = outs = 0
    isAway = !isAway
  }

  resetFrame()
  return {
    addEntry(entry) {
      if(entry === 0) {
        if(++outs > 2) {
          isAway ? away += score() : home += score()
          resetFrame()
        }
        return
      }

      runners++
      last = entry
      unscored = Math.min(runnersToNextPoint(), unscored + 1)
    },
    getScore() {
      const curAway = isAway ? away + score() : away
      const curHome = isAway ? home : home + score()
      return `Home: ${curHome} Away: ${curAway}`
    },
  }
}

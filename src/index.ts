const BASES = 3
export const sportsball = () => {
  let runners, unscoredRunners, outs
  const score = () => runners - unscoredRunners
  const runnersNeeded = (entry) => BASES + 1 - entry

  let away = 0
  let home = 0
  let isAway = false
  const reset = () => {
    runners = unscoredRunners = outs = 0
    isAway = !isAway
  }

  reset()
  return {
    addEntry(entry) {
      if(entry === 0) {
        if(++outs > 2) {
          isAway ? away += score() : home += score()
          reset()
        }
        return
      }

      runners++
      if(runnersNeeded(entry) - unscoredRunners < 1) {
        unscoredRunners = runnersNeeded(entry)
      } else {
        unscoredRunners++
      }
    },
    getScore() {
      const curAway = isAway ? away + score() : away
      const curHome = isAway ? home : home + score()
      return `Home: ${curHome} Away: ${curAway}`
    },
  }
}

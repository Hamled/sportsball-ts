const BASES = 3
export const sportsball = () => {
  let runners, onBase, outs
  let away = 0
  let home = 0
  let isAway = false

  const score = () => runners - onBase
  const newFrame = () => {
    runners = onBase = outs = 0
    isAway = !isAway
  }

  newFrame()
  return {
    addEntry(entry) {
      if(entry === 0) {
        if(++outs > 2) {
          isAway ? away += score() : home += score()
          newFrame()
        }
        return
      }
      runners++
      onBase = Math.min(BASES - entry, onBase) + 1
    },
    getScore() {
      const curAway = isAway ? away + score() : away
      const curHome = isAway ? home : home + score()
      return `Home: ${curHome} Away: ${curAway}`
    },
  }
}

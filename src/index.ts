const BASES = 3
export const sportsball = () => {
  let entries, last, load, outs
  let away = 0
  let home = 0
  let isAway = false

  const score = () => (entries - load) + Math.max(0, load - (BASES + 1 - last))
  const reset = () => {
    entries = last = load = outs = 0
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

      entries++
      last = entry
      load = Math.min(BASES + 1 - entry, load + 1)
    },
    getScore() {
      const curAway = isAway ? away + score() : away
      const curHome = isAway ? home : home + score()
      return `Home: ${curHome} Away: ${curAway}`
    },
  }
}

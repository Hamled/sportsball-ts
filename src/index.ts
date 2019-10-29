export const sportsball = (bases) => {
  const FRAME_LEN = bases + 1
  const frame = Array(FRAME_LEN)
  let cursor = FRAME_LEN

  let away = 0
  let home = 0
  let isAway = true
  let outs = 0

  const scoreFrame = () => {
    let max = 0
    for(let i = cursor; i < FRAME_LEN; i++) {
      const e = frame[i]
      max = (e > max) ? e : (max + 1)
      if(bases - max < 0) return FRAME_LEN - i
    }

    return 0
  }

  return {
    addEntry(entry) {
      if(entry !== 0) {
        cursor--
        frame[cursor] = entry
        return
      }

      outs += 1
      if(outs > 2) {
        const score = scoreFrame()
        isAway ? away += score : home += score
        isAway = !isAway
        outs = 0
        cursor = FRAME_LEN
      }
    },

    getScore() {
      const curScore = scoreFrame()
      const curAway = isAway ? away + curScore : away
      const curHome = isAway ? home : home + curScore
      return `Home: ${curHome} Away: ${curAway}`
    }
  }
}

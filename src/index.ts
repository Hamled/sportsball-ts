const FRAME_LEN = 4

export const sportsball = (bases = 3) => {
  let frame = Array(FRAME_LEN)
  let cursor = FRAME_LEN

  let away = 0
  let home = 0
  let isAway = true
  let outs = 0

  const scoreFrame = () => {
    let need = 3
    for(let i = cursor; i < FRAME_LEN; i++) {
      const e = frame[i]
      if(e === 4) return FRAME_LEN - i
      if(e === 3 || need < 2) return FRAME_LEN - i - 1
      if(e === 2 || e === 1) need -= e
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
      const score = scoreFrame()
      const curAway = isAway ? away + score : away
      const curHome = isAway ? home : home + score
      return `Home: ${curHome} Away: ${curAway}`
    }
  }
}

const FRAME_LENGTH = 4
export const sportsball = () => {
  let cursor = FRAME_LENGTH
  let frame = Array(FRAME_LENGTH)
  let away = 0
  let home = 0
  let outs = 0
  let isAway = true

  const scoreFrame = () => {
    let need = 3
    for(let i = cursor; i < FRAME_LENGTH; i++) {
      const e = frame[i]
      if(e === 4) return FRAME_LENGTH - i
      if(e === 3 || need <= 1) return FRAME_LENGTH - i - 1
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
        frame = Array(FRAME_LENGTH)
        cursor = FRAME_LENGTH
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

const BASES = 3
const BUFFER_LEN = BASES + 1
export const sportsball = () => {
  const buffer = Array(BUFFER_LEN)
  let cursor, frameLen, points, outs
  let away = 0
  let home = 0
  let isAway = false

  const setupFrame = () => {
    cursor = 0
    frameLen = 0
    points = 0
    outs = 0
    isAway = !isAway
  }

  const scoreFrame = () => {
    let max = 0
    for(let i = 1; i <= frameLen; i++) {
      const e = buffer[(cursor - i + BUFFER_LEN) % BUFFER_LEN]
      max = (e > max) ? e : (max + 1)
      if(BASES - max < 0) return points + frameLen - i + 1
    }

    return 0
  }

  setupFrame()
  return {
    addEntry(entry) {
      if(entry !== 0) {
        buffer[cursor] = entry
        cursor = (cursor + 1) % BUFFER_LEN
        if(frameLen > BUFFER_LEN) {
          points++
        } else {
          frameLen++
        }
        return
      }

      outs += 1
      if(outs > 2) {
        const score = scoreFrame()
        isAway ? away += score : home += score
        setupFrame()
      }
    },
    getScore() {
      const curScore = scoreFrame()
      const curAway = isAway ? away + curScore : away
      const curHome = isAway ? home : away + curScore
      return `Home: ${curHome} Away: ${curAway}`
    },
  }
}

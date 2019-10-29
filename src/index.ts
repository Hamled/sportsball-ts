const BASES = 3
const BUFFER_LEN = BASES + 1
export const sportsball = () => {
  const buffer = Array(BUFFER_LEN)
  let cursor, frameLen, points

  const setup = () => {
    cursor = 0
    frameLen = 0
    points = 0
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

  setup()
  return {
    addEntry(entry) {
      buffer[cursor] = entry
      cursor = (cursor + 1) % BUFFER_LEN
      if(frameLen > BUFFER_LEN) {
        points++
      } else {
        frameLen++
      }
    },
    getScore() {
      return `Home: 0 Away: ${scoreFrame()}`
    },
  }
}

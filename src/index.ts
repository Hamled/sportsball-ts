export const sportsball = (bases) => {
  const FRAME_LEN = bases + 1
  const frame = Array(FRAME_LEN)
  let cursor = FRAME_LEN

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
      cursor--
      frame[cursor] = entry
    },

    getScore() {
      return `Home: 0 Away: ${scoreFrame()}`
    }
  }
}

const FRAME_LENGTH = 4
export const sportsball = () => {
  let cursor = FRAME_LENGTH
  let frame = Array(FRAME_LENGTH)
  const scoreFrame = () => {
    let need = 3
    for(let i = cursor; i < FRAME_LENGTH; i++) {
      const e = frame[i]
      if(e === 4) return FRAME_LENGTH - i
      if(e === 3 || need <= 1) return FRAME_LENGTH - i - 1
      if(e === 2) need -= e
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

export const sportsball = () => {
  let frame = []
  let away = 0
  let home = 0
  let isAway = true
  let outs = 0

  const scoreFrame = () => {
    let need = 3
    for(let i = 0; i < frame.length; i++) {
      const e = frame[i];
      if(e === 4) return frame.length - i
      if(e === 3) return frame.length - i - 1

      if(need <= 1) return frame.length - i - 1
      if(e === 2 || e === 1) need -= e
    }

    return 0
  }

  return {
    addEntry(entry) {
      if(entry !== 0) {
        frame.unshift(entry)
        return
      }
      outs += 1
      if(outs > 2) {
        const score = scoreFrame()
        isAway ? away += score : home += score
        outs = 0
        isAway = !isAway
        frame = []
      }
    },
    getScore() {
      const score = scoreFrame()
      const curAway = away + (isAway ? score : 0)
      const curHome = home + (isAway ? 0 : score)
      return `Home: ${curHome} Away: ${curAway}`
    }
  }
}

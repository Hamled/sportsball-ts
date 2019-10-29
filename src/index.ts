const BASES = 3
export const sportsball = () => {
  let runners = 0
  let unscoredRunners = 0
  const score = () => runners - unscoredRunners
  const runnersNeeded = (entry) => BASES + 1 - entry

  return {
    addEntry(entry) {
      runners++
      if(runnersNeeded(entry) - unscoredRunners < 1) {
        unscoredRunners = runnersNeeded(entry)
      } else {
        unscoredRunners++
      }
    },
    getScore() {
      return `Home: 0 Away: ${score()}`
    },
  }
}

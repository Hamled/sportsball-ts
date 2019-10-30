const BASES = 3
export const sportsball = () => {
  let runners = 0
  let unscored = 0
  let last = 0
  const score = () => runners - unscored
  const runnersToNextPoint = () => BASES + 1 - last

  return {
    addEntry(entry) {
      runners++
      last = entry
      unscored = Math.min(runnersToNextPoint(), unscored + 1)
    },
    getScore() {
      return `Home: 0 Away: ${score()}`
    },
  }
}

const BASES = 3
export const sportsball = () => {
  let runners = 0
  let unscored = 0
  const score = () => runners - unscored

  return {
    addEntry(entry) {
      runners++
      unscored++
      if(entry >= BASES) unscored = (BASES + 1 - entry)
    },
    getScore() {
      return `Home: 0 Away: ${score()}`
    },
  }
}

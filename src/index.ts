const BASES = 3
export const sportsball = () => {
  let runners = 0
  let onBase = 0

  return {
    addEntry(entry) {
      runners++
      onBase++
      if(entry >= BASES) onBase = BASES - entry + 1
    },
    getScore() {
      return `Home: 0 Away: ${runners - onBase}`
    },
  }
}

export const sportsball = () => {
  let runners = 0
  let onBase = 0

  return {
    addEntry(entry) {
      runners++
      onBase++
      if(entry === 4) onBase = 0
    },
    getScore() {
      return `Home: 0 Away: ${runners - onBase}`
    },
  }
}

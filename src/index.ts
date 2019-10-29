export const sportsball = () => {
  let runners = 0
  let points = 0
  return {
    addEntry(entry) {
      runners++
      if(entry === 4) points += runners
    },
    getScore() {
      return `Home: 0 Away: ${points}`
    },
  }
}

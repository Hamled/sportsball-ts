export const sportsball = () => {
  let entries = 0
  return {
    addEntry(_entry) {
      entries++
    },
    getScore() {
      return `Home: 0 Away: ${entries}`
    },
  }
}

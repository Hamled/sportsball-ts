const BASES = 3
export const sportsball = () => {
  let entries = 0
  let last = BASES + 1

  const score = () => entries - (BASES + 1 - last)

  return {
    addEntry(entry) {
      entries++
      last = entry
    },
    getScore() {
      return `Home: 0 Away: ${score()}`
    },
  }
}

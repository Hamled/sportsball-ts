const BASES = 3
export const sportsball = () => {
  let entries = 0
  let last = BASES + 1
  let load = 0

  const score = () => (entries - load) + Math.max(0, load - (BASES + 1 - last))

  return {
    addEntry(entry) {
      entries++
      last = entry
      load = (entry === 4) ? 0 : load + 1
    },
    getScore() {
      return `Home: 0 Away: ${score()}`
    },
  }
}

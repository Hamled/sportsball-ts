export const sportsball = () => {
  let runners = 0
  let since4 = 0
  const score = () => runners - since4
  
  return {
    addEntry(entry) {
      runners++
      since4++
      if(entry === 4) since4 = 0
    },
    getScore() {
      return `Home: 0 Away: ${score()}`
    },
  }
}

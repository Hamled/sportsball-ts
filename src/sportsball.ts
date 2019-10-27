export class Sportsball {
  private score = 0;

  getScore() {
    return `Home: 0 Away: ${Math.floor(this.score / 4)}`
  }
  addEntry(score: number) {
    this.score += score
  }
}

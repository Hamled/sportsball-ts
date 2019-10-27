export class Sportsball {
  private score = 0;

  getScore() {
    return `Home: 0 Away: ${this.score / 4}`
  }
  addEntry(score: number) {
    this.score += score
  }
}

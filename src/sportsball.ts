export enum TurnResult {
  HOME_RUN
}

export class Sportsball {
  private away: number = 0;

  getScore(): string {
    return `Home: 0 Away: ${this.away}`;
  }

  addEntry(_result: TurnResult) {
    this.away++;
  }
}

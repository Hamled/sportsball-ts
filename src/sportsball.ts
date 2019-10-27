export enum TurnResult {
  HOME_RUN
}

export class Sportsball {
  getScore(): string {
    return 'Home: 0 Away: 0';
  }

  addEntry(_result: TurnResult) {}
}

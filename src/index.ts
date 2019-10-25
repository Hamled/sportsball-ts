export type ScoredGameState = {away: number, home: number};
type GameStateReducer = (state?: ScoredGameState, score?: number) => ScoredGameState;

export class Sportsball {
  private readonly entries: number[] = [];

  constructor(private readonly reducer: GameStateReducer) {
  }

  getScore(): string {
    const state = this.entries.reduce(this.reducer, this.reducer());
    return `Home: ${state.home} Away: ${state.away}`;
  }

  addEntry(): void {
    this.entries.push(0);
  }
}

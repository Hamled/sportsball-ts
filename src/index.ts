export type ScoredGameState = {away: number, home: number};
type GameStateReducer = (state?: ScoredGameState, score?: number) => ScoredGameState;

export class Sportsball {
  constructor(private readonly reducer: GameStateReducer) {
  }

  getScore(): string {
    const state = this.reducer();
    return `Home: ${state.home} Away: ${state.away}`;
  }

  addEntry(): void {}
}

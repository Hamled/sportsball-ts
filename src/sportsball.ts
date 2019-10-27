export enum TurnResult {
  OUT,
  HOME_RUN
}

type Team = {points: number, outs: number};

export class Sportsball {
  private away: Team = {points: 0, outs: 0};
  private home: Team = {points: 0, outs: 0};

  private awayTurn: boolean = true;

  getScore(): string {
    return `Home: ${this.home.points} Away: ${this.away.points}`;
  }

  addEntry(result: TurnResult) {
    const team = this.playingTeam();
    if(result == TurnResult.HOME_RUN) {
      team.points += 1;
    } else {
      team.outs += 1;
    }

    if(team.outs == 3) {
      this.awayTurn = !this.awayTurn;
      team.outs = 0;
    }
  }

  private playingTeam(): Team {
    return this.awayTurn ? this.away : this.home;
  }
}

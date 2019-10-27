export enum TurnResult {
  OUT,
  SINGLE = 1,
  DOUBLE = 2,
  TRIPLE = 3,
  HOME_RUN
}

type Team = {points: number, outs: number};

export class Sportsball {
  private away: Team = {points: 0, outs: 0};
  private home: Team = {points: 0, outs: 0};

  private awayTurn: boolean = true;

  private onBase: number = 0;

  getScore(): string {
    return `Home: ${this.home.points} Away: ${this.away.points}`;
  }

  addEntry(result: TurnResult) {
    const team = this.playingTeam();
    if(result == TurnResult.OUT) {
      team.outs += 1;
    } else {
      this.scoreResult(result, team);
    }

    if(team.outs == 3) {
      this.awayTurn = !this.awayTurn;
      this.onBase = 0;
      team.outs = 0;
    }
  }

  private playingTeam(): Team {
    return this.awayTurn ? this.away : this.home;
  }

  private scoreResult(result: TurnResult, team: Team) {
    if(result == TurnResult.HOME_RUN) {
      team.points += 1;
    } else if(this.onBase == 3 && result >= TurnResult.SINGLE) {
      team.points += 1;
    } else if(this.onBase == 2 && result >= TurnResult.DOUBLE) {
      team.points += 1;
    } else if(this.onBase == 1 && result >= TurnResult.TRIPLE) {
      team.points += 1;
    } else {
      this.onBase += 1;
    }
  }
}

export enum Team {
  Home,
  Away
}

export interface GameState {
  away: number;
  home: number;
  turn: {
    team: Team;
  };
}

// Private functions
const initialState = (): GameState => {
  return {
    away: 0,
    home: 0,
    turn: {
      team: Team.Away,
    }
  };
};

const isValidState = (state: GameState): boolean => {
  if(state.away < 0) return false;
  if(state.home < 0) return false;

  return true;
}

export const gameState = (state?: GameState, playerScore?: number): GameState => {
  if(!state) return initialState();
  if(!isValidState(state)) {
    throw new Error(`gameState called with invalid game state: ${state}`);
  }

  if(!playerScore) return state;
  if(!Number.isInteger(playerScore) || playerScore < 0 || playerScore > 4) {
    throw new Error(`gameState called with invalid player score: ${playerScore}`);
  }

  const team = state.turn.team;
  if(playerScore == 4) {
    if(team == Team.Home) {
      return {...state, home: state.home + 1};
    } else {
      return {...state, away: state.away + 1};
    }
  }

  return state;
}

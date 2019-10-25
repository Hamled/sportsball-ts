export enum Team {
  Home,
  Away
}

export interface GameState {
  away: number;
  home: number;
  turn: {
    team: Team;
    bases: boolean[];
  };
}

// Private functions
const initialState = (): GameState => {
  return {
    away: 0,
    home: 0,
    turn: {
      team: Team.Away,
      bases: [false, false, false],
    }
  };
};

const isValidState = (state: GameState): boolean => {
  if(state.away < 0) return false;
  if(state.home < 0) return false;

  if(state.turn.bases.length != 3) return false;

  return true;
}

const countBases = (state: GameState): number => {
  return state.turn.bases.filter(b => b).length;
};

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
  let newState = state;
  if(playerScore == 4) {
    // Always clears bases
    const bases = [false, false, false];
    newState = {...newState, turn: {...newState.turn, bases}};

    // Everyone on-base gets a run, plus the hitter
    const newScore = countBases(state) + 1;
    if(team == Team.Home) {
      newState = {...newState, home: state.home + newScore};
    } else {
      newState = {...newState, away: state.away + newScore};
    }
  } else if(playerScore == 3) {
    // Always leaves one player on third base
    const bases = [false, false, true];
    newState = {...newState, turn: {...newState.turn, bases}};

    // Everyone on-base gets a run
    const newScore = countBases(state);
    if(team == Team.Home) {
      newState = {...newState, home: state.home + newScore};
    } else {
      newState = {...newState, away: state.away + newScore};
    }
  }

  return newState;
}

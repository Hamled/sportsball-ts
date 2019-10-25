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
    outs: number;
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
      outs: 0
    }
  };
};

const isValidState = (state: GameState): boolean => {
  if(state.away < 0) return false;
  if(state.home < 0) return false;

  if(state.turn.bases.length != 3) return false;
  if(state.turn.outs < 0 || state.turn.outs > 2) return false;

  return true;
}

const countBases = (state: GameState): number => {
  return state.turn.bases.filter(b => b).length;
};

const opposingTeam = (team: Team): Team => {
  return team == Team.Home ? Team.Away : Team.Home;
}

export const gameState = (state?: GameState, playerScore?: number): GameState => {
  if(!state) return initialState();
  if(!isValidState(state)) {
    throw new Error(`gameState called with invalid game state: ${state}`);
  }

  if(playerScore == undefined) return state;
  if(!Number.isInteger(playerScore) || playerScore < 0 || playerScore > 4) {
    throw new Error(`gameState called with invalid player score: ${playerScore}`);
  }

  let newState = state;
  let newScore = 0;
  if(playerScore == 4) {
    // Always clears bases
    const bases = [false, false, false];
    newState = {...newState, turn: {...newState.turn, bases}};

    // Everyone on-base gets a run, plus the hitter
    newScore = countBases(state) + 1;
  } else if(playerScore == 3) {
    // Always leaves one player on third base
    const bases = [false, false, true];
    newState = {...newState, turn: {...newState.turn, bases}};

    // Everyone on-base gets a run
    newScore = countBases(state);
  } else if(playerScore == 2) {
    // Always leaves nobody on first, and player on second
    // may leave player on third
    const onThird = countBases(state) > 0;
    const bases = [false, true, onThird];
    newState = {...newState, turn: {...newState.turn, bases}};

    // All but one on-base player gets a run
    newScore = Math.max(countBases(state) - 1, 0);
  } else if(playerScore == 1) {
    const count = countBases(state);

    // Always leaves player on first, maybe player on other bases
    const onThird = count > 1 || state.turn.bases[2];
    const onSecond = count > 1 || state.turn.bases[1] || state.turn.bases[0];
    const bases = [true, onSecond, onThird];
    newState = {...newState, turn: {...newState.turn, bases}};

    // If bases are loaded, one player gets a run
    newScore = count == 3 ? 1 : 0;
  } else if(playerScore == 0) {
    // Increment the number of outs
    const outs = newState.turn.outs + 1;

    if(outs == 3) {
      // Change teams if number of outs is 3
      newState = {
        ...newState,
        turn: {
          ...newState.turn,
          team: opposingTeam(newState.turn.team),
          bases: [false, false, false],
          outs: 0
        }
      };
    } else {
      // Otherwise keep track of the new number of outs
      newState = {...newState, turn: {...newState.turn, outs}};
    }
  }

  if(state.turn.team == Team.Home) {
    newState = {...newState, home: state.home + newScore};
  } else {
    newState = {...newState, away: state.away + newScore};
  }
  return newState;
}

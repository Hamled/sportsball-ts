export interface GameState {
  away: number;
  home: number;
}

// Private functions
const initialState = (): GameState => {
  return {
    away: 0,
    home: 0,
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

  return state; // Gotta return something...
}

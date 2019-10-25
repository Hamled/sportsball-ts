export interface GameState {
}

// Private functions
const initialState = (): GameState => {
  return {};
};

export const gameState = (state?: GameState, playerScore?: number): GameState => {
  if(!state) return initialState();
  if(!playerScore) return state;

  if(!Number.isInteger(playerScore) || playerScore < 0 || playerScore > 4) {
    throw new Error(`gameState called with invalid player score: ${playerScore}`);
  }

  return state; // Gotta return something...
}

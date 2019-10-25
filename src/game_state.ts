export interface GameState {
}

// Private functions
const initialState = (): GameState => {
  return {};
};

export const gameState = (state?: GameState, playerScore?: number): GameState => {
  if(!state) return initialState();
  if(!playerScore) return state;

  return state; // Gotta return something...
}

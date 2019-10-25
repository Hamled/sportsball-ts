export interface GameState {
}

// Private functions
const initialState = (): GameState => {
  return {};
};

export const gameState = (state?: GameState): GameState => {
  if(!state) return initialState();

  return state; // Gotta return something...
}

import { types } from '../actions';

const initialGameState = {
  id: '',
  code: '',
  rounds: '',
  players: [],
  active: false,
  private: true,
  prompt: '',
  powerUps: [],
};

const gameReducer = (state = initialGameState, action) => {
  switch (action.type) {
    case types.UPDATE_PLAYERS:
      return {
        ...state,
        players: [...action.players],
      };
    case types.UPDATE_GAME:
      return {
        ...state,
        rounds: action.payload.rounds,
        difficulty: action.payload.difficulty,
      };
    case types.GET_CURRENT_GAME:
      return {
        ...state,
        id: action.payload.game.id,
        active: action.payload.game.active,
        prompt: action.payload.game.prompt,
        code: action.payload.game.code,
        private: action.payload.game.private,
        rounds: action.payload.game.rounds,
        difficulty: action.payload.game.difficulty,
        players: action.payload.players,
      };
    case types.SET_PROMPT:
      return {
        ...state,
        prompt: action.payload,
      };
    case types.SET_POWERUPS:
      return {
        ...state,
        powerUps: action.payload,
      };
    case types.START_GAME:
      return {
        ...state,
        active: action.payload.active,
      };
    default:
      return state;
  }
};

export default gameReducer;

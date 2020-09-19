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
        id: action.payload.id,
        active: action.payload.active,
        prompt: action.payload.prompt,
        code: action.payload.code,
        private: action.payload.private,
        rounds: action.payload.rounds,
        difficulty: action.payload.difficulty,
        players: action.payload.sessions,
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

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
    case types.ADD_PLAYER:
      return {
        ...state,
        players: state.players.push(action.player),
      };
    case types.RM_PLAYER:
      return {
        ...state,
        players: state.players.filter((p) => p.id !== action.player.id),
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

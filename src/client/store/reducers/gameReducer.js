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
  roundStart: '',
  roundEnd: '',
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
      console.log('reducer', action.payload);
      return {
        ...state,
        id: action.payload.id,
        active: action.payload.active,
        prompt: action.payload.prompt,
        code: action.payload.code,
        private: action.payload.private,
        rounds: action.payload.rounds,
        difficulty: action.payload.difficulty,
        // players: action.payload.sessions,
        roundStart: action.payload.roundStart,
        roundEnd: action.payload.roundEnd,
        players: action.players,
        host: action.hostStatus,
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
    case types.UPDATE_CODE:
      return {
        ...state,
        code: action.code,
      };
    case types.SET_ROUND_TIMES:
      return {
        ...state,
        roundEnd: action.payload.end,
        roundStart: action.payload.start,
      };
    default:
      return state;
  }
};

export default gameReducer;

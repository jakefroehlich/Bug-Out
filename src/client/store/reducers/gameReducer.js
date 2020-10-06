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
  roundStartUnix: '',
  roundEnd: '',
  roundOver: false,
  roundEndUnix: '',
  sufferingPowerUp: null,
  powerUpCount: 0,
};

const gameReducer = (state = initialGameState, action) => {
  switch (action.type) {
    case types.ADD_PLAYER:
      return {
        ...state,
        players: [...state.players, action.player],
      };
    case types.SET_PLAYERS:
      return {
        ...state,
        players: action.players,
      }
    case types.UPDATE_GAME:
      return {
        ...state,
        rounds: action.payload.rounds,
        difficulty: action.payload.difficulty,
      };
    case types.GET_CURRENT_GAME:
      console.log('payload', action.payload)
      return {
        ...state,
        id: action.payload.id,
        active: action.payload.active,
        prompt: action.payload.prompt,
        code: action.payload.code,
        private: action.payload.private,
        rounds: action.payload.rounds,
        difficulty: action.payload.difficulty,
        roundStartUnix: action.payload.roundStartUnix,
        roundEnd: action.payload.roundEnd,
        // roundOver: action.payload.roundOver,
        players: action.players,
        host: action.hostStatus,
        roundEndUnix: action.payload.roundEndUnix,
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
        active: true,
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
        roundStartUnix: action.payload.start,
        roundEndUnix: action.payload.endUnix,
      };
    case types.SET_ROUND_OVER:
      return {
        ...state,
        roundOver: true,
      };
    case types.NEW_ROUND:
      return {
        ...state,
        rounds: action.payload.rounds -1,
        prompt: action.payload.prompt,
        roundEnd: action.payload.roundEnd,
        roundStart: action.payload.roundStart,
        roundOver: false,
      };
    case types.SET_GAME_SCORES:
      return {
        ...state,
        players: action.payload,
      };
    case types.SUFFER_POWER_UP:
      return {
        ...state,
        sufferingPowerUp: action.payload,
        powerUpCount: state.powerUpCount + 1,
      };
    case types.GET_LEADERBOARD:
      return {
        ...state,
        leaderboard: action.payload,
      };
    case types.RESET_GAME:
      return {
        ...initialGameState,
      }
    default:
      return state;
  }
};

export default gameReducer;

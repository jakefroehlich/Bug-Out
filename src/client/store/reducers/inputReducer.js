import { types } from '../actions';

const initialState = {
  playerName: null,
  score: 0,
  correctAnswer: false,
  playerPowerUps: [],
  alias: '',
};

const inputReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_INPUT:
      return {
        ...state,
        [action.name]: action.value,
      };
    case types.SET_CORRECT:
      return {
        ...state,
        correctAnswer: true,
      };
    case types.SET_WRONG:
      return {
        ...state,
        correctAnswer: false,
      };
    case types.ADD_SCORE:
      return {
        ...state,
        score: state.score + action.payload,
      };
    case types.UPDATE_ALIAS:
      return {
        ...state,
        alias: action.alias,
      };
    default:
      return state;
  }
};

export default inputReducer;

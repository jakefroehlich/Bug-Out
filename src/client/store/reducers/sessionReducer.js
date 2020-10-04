import { types } from '../actions';

const initialState = {
  name: null,
  id: null,
  host: false,
  score: 0,
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SESSION:
      return {
        ...state,
        name: action.session.name,
        id: action.session.id,
        host: action.session.host,
        score: action.session.score,
      };
    case types.LEAVE_GAME:
      return {
        ...state,
        session: action.payload,
      };
    case types.UPDATE_HOST:
      return {
        ...state,
        host: action.payload,
      };
    case types.RESET_SCORE:
      return {
        ...state,
        score: 0,
      };
    default:
      return state;
  }
};

export default sessionReducer;

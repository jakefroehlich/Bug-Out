import { types } from '../actions';

const initialState = {
  name: null,
  id: null,
  host: false,
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SESSION:
      return {
        ...state,
        name: action.session.name,
        id: action.session.id,
        host: action.session.host,
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
      }
    default:
      return state;
  }
};

export default sessionReducer;

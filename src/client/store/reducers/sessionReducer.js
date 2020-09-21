import { types } from '../actions';

const initialState = {
  name: null,
  id: null,
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SESSION:
      return {
        ...state,
        name: action.session.name,
        id: action.session.id,
      };
    case types.LEAVE_GAME:
      return {
        ...state,
        session: action.payload,
      };
    default:
      return state;
  }
};

export default sessionReducer;

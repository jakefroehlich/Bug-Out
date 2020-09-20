import { types } from '../actions';

const initialState = {
  name: null,
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_NAME:
      return {
        ...state,
        name: action.payload,
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

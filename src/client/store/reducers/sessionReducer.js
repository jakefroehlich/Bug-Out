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
    default:
      return state;
  }
};

export default sessionReducer;

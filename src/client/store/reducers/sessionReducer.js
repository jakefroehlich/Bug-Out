import { types } from '../actions';

const initialState = {
  name: null,
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_NAME:
      console.log(action)
        return {
        ...state,
        name: action.payload,
      };
    default:
      return state;
  }
};

export default sessionReducer;

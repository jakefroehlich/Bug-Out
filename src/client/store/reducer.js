import { combineReducers } from 'redux';
import { types } from './actions';

const initialState={
  email:'',
  loggedIn: false,
  initialLoadingComplete: false,
}

const loginReducer=(state=initialState, action)=>{
  switch(action.type){
    case types.LOGIN:
      return {
        ...state,
        email: action.email,
        loggedIn: true,
        role: action.role,
      };
    case types.LOGOUT:
      return {
        ...state,
        email: null,
        loggedIn: false,
        role: 'guest'
      };
    case types.INITIAL_LOADING_COMPLETE:
      return {
        ...state,
        initialLoadingComplete: true
      };
    default: return state;
  }
}

const reducer = combineReducers({
  user: loginReducer,
});

export default reducer;
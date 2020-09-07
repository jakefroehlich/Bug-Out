import { combineReducers } from 'redux';
import gameReducer from './gameReducer'
import loginReducer from './loginReducer'

const reducer = combineReducers({
  user: loginReducer,
  game: gameReducer
});

export default reducer;
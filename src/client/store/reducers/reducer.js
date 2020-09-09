import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import loginReducer from './loginReducer';
import inputReducer from './inputReducer';

const reducer = combineReducers({
  user: loginReducer,
  game: gameReducer,
  input: inputReducer,
});

export default reducer;
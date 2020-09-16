import { combineReducers } from 'redux';
import gameReducer from './gameReducer';
import loginReducer from './loginReducer';
import inputReducer from './inputReducer';
import messageReducer from './messageReducer';
import sessionReducer from './sessionReducer';

const reducer = combineReducers({
  user: loginReducer,
  input: inputReducer,
  messages: messageReducer,
  session: sessionReducer,
});

export default reducer;

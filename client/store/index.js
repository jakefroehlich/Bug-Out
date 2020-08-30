import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunks from 'redux-thunk';
import reducer from './reducer';


// const loggingMiddleware=store=>next=>action=>{
//   console.log('Action:', action)
//   next(action);
//   console.log('New State', store.getState())
// }


const store = createStore(reducer, applyMiddleware(thunks));

export default store; 

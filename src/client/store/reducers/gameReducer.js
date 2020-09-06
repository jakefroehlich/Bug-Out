import { types } from '../actions';

const initialGameState={
    rounds:'',
    currentId: '',
    players:[],
    active: false,
  }
  
  const gameReducer=(state=initialGameState, action)=>{
    switch(action.type){
      case types.NEW_GAME:
        return {
          ...state,
          currentId: action.payload.id,
          active: true,
          code: action.payload.code,
          private: action.payload.private,
          rounds: action.payload.rounds,
          difficulty: action.payload.difficulty,
        };
      case types.GET_CURRENT_GAME:
        return {
           ...state,
           currentId: action.payload.id,
           active: true,
           code: action.payload.code,
           private: action.payload.private,
           rounds: action.payload.rounds,
           difficulty: action.payload.difficulty,
          }
      default: return state;
    }
  }

  export default gameReducer

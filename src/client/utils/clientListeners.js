import store from '../store/index';
import { addMessage, roundOver } from '../store/actions';
import { setRoundTimesThunk } from '../store/thunks';

const clientListeners = (socket) => {
  socket.on('message', (message) => {
    console.log(message);
  });

  socket.on('message_sent', (message) => {
    console.log('socketListeners: ', message);
    store.dispatch(addMessage(message));
  });

  socket.on('roundOver', () => {
    store.dispatch(roundOver());
  })

  socket.on('startGame', () => {
    store.dispatch(setRoundTimesThunk(store.game.id));
    
  })
};

export default clientListeners;

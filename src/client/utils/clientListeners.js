import store from '../store/index';
import {
  addMessage, roundOver, startGame, sufferPowerUp,
} from '../store/actions';
import { setRoundTimesThunk, getCurrentGameThunk } from '../store/thunks';

const clientListeners = (socket) => {
  socket.on('message', (message) => {
    store.dispatch(addMessage(message));
  });

  socket.on('message_sent', (message) => {
    console.log('socketListeners: ', message);
    store.dispatch(addMessage(message));
  });

  socket.on('roundOver', () => {
    store.dispatch(roundOver());
  });

  socket.on('startGame', (gameId) => {
    store.dispatch(setRoundTimesThunk(gameId));
    store.dispatch(startGame());
  });

  socket.on('playerUpdate', () => {
    store.dispatch(getCurrentGameThunk());
  });

  socket.on('powerUp', (powerUpName) => {
    store.dispatch(sufferPowerUp(powerUpName));
    console.log('dispatching', powerUpName);
  });
};

export default clientListeners;

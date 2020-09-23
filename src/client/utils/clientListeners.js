import store from '../store/index';
import { addMessage } from '../store/actions';

const clientListeners = (socket) => {
  socket.on('message_sent', (message) => {
    console.log('socketListeners: ', message);
    store.dispatch(addMessage(message));
  });
};

export default clientListeners;

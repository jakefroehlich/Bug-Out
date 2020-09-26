import io from 'socket.io-client';
import clientListeners from './clientListeners';

const socket = io();

export const startSocket = () => {
  socket.on('connect', () => {
    clientListeners(socket);
  });
};

export default socket;

const socketio = require('socket.io');
const { app, server } = require('./server');
const formatMessage = require('../utils/formatMessage');

const io = socketio(server);

const botName = 'BugOut Bot';

io.on('connection', (socket) => {
  console.log('socket connected with session:', socket.handshake.headers.cookie);

  // Confirmation message
  // console.log(socket);
  socket.emit(
    'message',
    formatMessage(botName, 'Confirmation: You have connected!'),
  );

  // TODO - Add new user to message
  socket.broadcast.emit(
    'message',
    formatMessage(botName, '{user} has joined the fray!'),
  );

  socket.on('joinRoom', (code) => {
    console.log('Joining room: ', code);
    socket.join(code, () => {
      socket.emit('playerUpdate');
    });
  });

  socket.on('leaveRoom', (code, player) => {
    socket.leave(code, () => {
      console.log('leaving room', code);
      socket.to(code).emit('playerLeave', player);
    });
  });

  socket.on('newPlayer', (name, code) => {
    io.to(code).emit('playersUpdate', name);
  });

  socket.on('chatMsg', (msg, code, name) => {
    console.log('chat code', code);
    io.to(code).emit('message', formatMessage(name, msg));
  });

  socket.on('disconnecting', () => {
    const rooms = Object.keys(socket.rooms);
    // the rooms array contains at least the socket ID
    console.log('rooms', rooms);
  });

  socket.on('disconnect', () => {
    // TODO Add username to message
    console.log('disconnected from socket!');
    io.emit('message', formatMessage(botName, '{user} has fled the scene!'));
  });
});

module.exports = { app, server };

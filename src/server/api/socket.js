const socketio = require('socket.io');
const { app, server } = require('./server');
const formatMessage = require('../utils/formatMessage');

const io = socketio(server);

const botName = 'BugOut Bot';

io.on('connection', (socket) => {
  //   console.log(socket.handshake.headers.cookie)

  // Confirmation message
  socket.emit(
    'message',
    formatMessage(botName, 'Confirmation: You have connected!'),
  );

  // TODO - Add new user to message
  socket.broadcast.emit(
    'message',
    formatMessage(botName, '{user} has joined the fray!'),
  );

  socket.on('joinRoom', (code, user) => {
    console.log('Joining room: ', code)
    socket.join(code, () => {
      socket.emit('playerUpdate', user);
    });
  });

  socket.on('newPlayer', (name, code) => {
    io.to(code).emit('playersUpdate', name);
  });

  socket.on('chatMsg', (msg, code) => {
    console.log('chat code', code)
    io.to(code).emit('message', formatMessage('USER', msg));
  });

  socket.on('disconnect', () => {
    // TODO Add username to message
    io.emit('message', formatMessage(botName, '{user} has fled the scene!'));
  });
});

module.exports = { app, server };

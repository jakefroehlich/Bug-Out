const chalk = require('chalk');
const formatMessage = require('../utils/formatMessage');

const serverListeners = (io, socket) => {
  console.log('New client, who dis');
  console.log(chalk.yellow('socketid: ', socket.id));

  let socketRoomId;

  socket.on('joinRoom', (gameSessionId) => {
    socket.join(gameSessionId);
    socketRoomId = gameSessionId;
  });

  socket.on('leaveRoom', () => {
    socket.leave(socketRoomId);
  });

  socket.on('chatMsg', (msg, name) => {
    console.log('chatMsg!', socket.rooms);
    io.to(socketRoomId).emit('message', formatMessage(name, msg, socketRoomId));
  });

  socket.on('roundOver', () => {
    io.emit('roundOver');
  });

  socket.on('startGame', () => {
    io.emit('startGame', socketRoomId);
  });

  socket.on('powerUp', (powerUpName) => {
    socket.broadcast.emit('powerUp', powerUpName);
  });

  // socket.on('discon', () => {
  //   const rooms = Object.keys(socket.rooms);
  //   rooms.forEach((room) => socket.leave(room));
  //   console.log('disconnected', socket.rooms);
  // });

  // socket.on('chatMsg', (msg, name) => {
  //   console.log('serverListeners: ', msg);
  //   io.emit('message_sent', formatMessage(name, msg));
  // });
};

module.exports = serverListeners;

const chalk = require('chalk');
const formatMessage = require('../utils/formatMessage');

const serverListeners = (io, socket) => {
  console.log('New client, who dis');
  console.log(chalk.yellow('socketid: ', socket.id));

  let socketRoomId;

  socket.on('joinRoom', (gameSessionId, alias) => {
    socket.join(gameSessionId);
    socketRoomId = gameSessionId;
    socket.broadcast.to(socketRoomId).emit('message', formatMessage('BugBot', `${alias} has joined the room!`));
    socket.broadcast.to(socketRoomId).emit('playerUpdate', socketRoomId);
  });

  socket.on('leaveRoom', () => {
    socket.leave(socketRoomId);
  });

  socket.on('chatMsg', (msg, name) => {
    console.log('chatMsg!', socket.rooms);
    io.to(socketRoomId).emit('message', formatMessage(name, msg));
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
};

module.exports = serverListeners;

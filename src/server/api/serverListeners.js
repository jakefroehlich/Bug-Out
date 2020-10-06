const chalk = require('chalk');
const formatMessage = require('../utils/formatMessage');

const serverListeners = (io, socket) => {
  console.log('New client, who dis');
  console.log(chalk.yellow('socketid: ', socket.id));

  socket.on('joinRoom', (id, alias) => {
    socket.join(id);
    socket.broadcast.to(id).emit('message', formatMessage('BugBot', `${alias} has joined the room!`));
    socket.broadcast.to(id).emit('playerUpdate', id);
  });

  socket.on('leaveRoom', (id, alias) => {
    socket.leave(id);
    socket.broadcast.to(id).emit('message', formatMessage('BugBot', `${alias} has left the room!`));
    socket.broadcast.to(id).emit('playerUpdate', id);
  });

  socket.on('chatMsg', (msg, name, id) => {
    console.log('chatMsg!', socket.rooms);
    io.to(id).emit('message', formatMessage(name, msg));
  });

  socket.on('roundOver', (id) => {
    io.to(id).emit('roundOver', id);
  });

  socket.on('startGame', (id) => {
    io.to(id).emit('startGame', id);
  });

  socket.on('powerUp', (powerUpName, id) => {
    socket.broadcast.to(id).emit('powerUp', powerUpName);
  });

  socket.on('gameOver', (id) => {
    socket.broadcast.to(id).emit('gameOver');
  });
};

module.exports = serverListeners;

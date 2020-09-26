const chalk = require('chalk');
const formatMessage = require('../utils/formatMessage');

const serverListeners = (io, socket) => {
  console.log('New client, who dis');
  console.log(chalk.yellow('socketid: ', socket.id));

  let socketRoomId;

  socket.on('joinRoom', (gameSessionId) => {
    for (const room in socket.rooms) {
      if (room !== gameSessionId) {
        socket.leave(room);
      }
    }

    if (!socket.rooms.length) {
      socket.join(gameSessionId);
      socketRoomId = gameSessionId;
    }
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

  socket.on('discon', () => {
    socket.off('joinGame', () => {
      console.log('removed all listeners');
    });
    console.log('disconnected');
  });

  // socket.on('chatMsg', (msg, name) => {
  //   console.log('serverListeners: ', msg);
  //   io.emit('message_sent', formatMessage(name, msg));
  // });
};

module.exports = serverListeners;

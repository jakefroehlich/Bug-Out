const chalk = require('chalk');
const formatMessage = require('../utils/formatMessage');

const serverListeners = (io, socket) => {
  console.log('New client, who dis');
  console.log(chalk.yellow('socketid: ', socket.id));

  // socket.status = false;

  //  This is sent to current user only
  // socket.emit('message', 'Sup brx! Welcome 2 BugOut');

  //  Broadcast when a user connects (to everyone except current user)
  // socket.broadcast.emit('message', 'A user has joined the fray');

  socket.on('joinRoom', (gameSessionId) => {
    for (let room in socket.rooms) {
      if (room !== gameSessionId) {
        socket.leave(room);
        console.log('leaving room')
      };
    };

    if (!socket.rooms.length) {
      console.log('Success joining room')
      socket.join(gameSessionId);
      socket.off('joinRoom', () => {
        console.log('off')
      })
      // socket.status = true;
    };

    socket.on('chatMsg', (msg, name) => {
      // console.log('socket rooms:', socket.rooms);
      // console.log('listeners:', socket.hasListeners());
      console.log('chatMsg!', socket.rooms)
      io.to(gameSessionId).emit('message', formatMessage(name, msg, gameSessionId));
    });

    socket.on('discon', () => {
      console.log('entered discon')
      socket.disconnect();
    })
  })

  socket.on('roundOver', () => {
    io.emit('roundOver');
  });

  socket.on('startGame', () => {
    io.emit('startGame');
  });

  // socket.on('getStatus', (id) => {
  //   console.log('status', socket.status);
  //   socket.emit('getStatus', socket.status, id);
  // });

  // socket.on('setStatus', (status) => {
  //   socket.status = status;
  // });

  //  Runs when client disconnects

  // socket.on('discon', () => {
  //   // socket.removeAllListeners('joinGame', () => {
  //   //   console.log('removed all listeners')
  //   // })
  //   socket.leave(room)
  //   console.log('disconnected')
  // });


  // socket.on('chatMsg', (msg, name) => {
  //   console.log('serverListeners: ', msg);
  //   io.emit('message_sent', formatMessage(name, msg));
  // });
};

module.exports = serverListeners;

const chalk = require('chalk');
const formatMessage = require('../utils/formatMessage');

const serverListeners = (io, socket) => {
  console.log('New client, who dis');
  console.log(chalk.yellow('socketid: ', socket.id));

  //  This is sent to current user only
  socket.emit('message', 'Sup brx! Welcome 2 BugOut');

  //  Broadcast when a user connects (to everyone except current user)
  socket.broadcast.emit('message', 'A user has joined the fray');

  //  Runs when client disconnects
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left the fray');
  });

  // socket.on('chatMsg', (msg, name) => {
  //   console.log('serverListeners: ', msg);
  //   io.emit('message_sent', formatMessage(name, msg));
  // });
};

module.exports = serverListeners;

const formatMessage = require('../utils/formatMessage');

const serverListeners = (io, socket) => {
  socket.on('chatMsg', (msg, name) => {
    console.log('serverListeners: ', msg);
    io.emit('message_sent', formatMessage(name, msg));
  });
};

module.exports = serverListeners;

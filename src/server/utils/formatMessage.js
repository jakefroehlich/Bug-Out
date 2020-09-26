const moment = require('moment');

const formatMessage = (playerName, text, socketId) => {
  const currentTime = moment();

  return {
    playerName,
    text,
    time: currentTime.format('h:mm a'),
    id: currentTime.format(),
    socketId,
  };
};

module.exports = formatMessage;

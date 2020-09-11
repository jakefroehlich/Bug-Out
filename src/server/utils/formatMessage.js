const moment = require('moment');

const formatMessage = (playerName, text) => {
  return {
    playerName,
    text,
    time: moment().format('h:mm a'),
  };
}

module.exports = formatMessage;

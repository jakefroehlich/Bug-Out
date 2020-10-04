const moment = require('moment');
const swearjar = require('swearjar');

const formatMessage = (playerName, incomingMsg) => {
  const currentTime = moment();

  const text = swearjar.censor(incomingMsg);

  return {
    playerName,
    text,
    time: currentTime.format('h:mm a'),
    id: currentTime.format(),
  };
};

module.exports = formatMessage;

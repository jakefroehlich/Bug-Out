const User = require('./user');
const Session = require('./session');
const GameSession = require('./gameSession');

User.hasMany(Session);
Session.belongsTo(User);

GameSession.hasMany(Session);
Session.belongsTo(GameSession);

module.exports={
  models: {
    User,
    Session,
    GameSession
  }
};
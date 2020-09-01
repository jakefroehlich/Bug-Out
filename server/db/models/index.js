const db = require('./db');
const User = require('./user');
const Session = require('./session');
const GameSession = require('./gameSession');

User.hasMany(Session);
Session.belongsTo(User);

GameSession.hasMany(User);
User.belongsTo(GameSession);

module.exports={
  db,
  models: {
    User,
    Session,
    GameSession
  }
};
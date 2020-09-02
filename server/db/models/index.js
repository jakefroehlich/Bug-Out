const User = require('./user');
const Session = require('./session');

User.hasMany(Session);
Session.belongsTo(User);

module.exports={
  models: {
    User,
    Session
  }
};
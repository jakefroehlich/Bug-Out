const { UUID, UUIDV4, STRING } = require('sequelize');

const db = require('./db');

const GameSession = db.define('gameSession',{
  id:{
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey:true
  },
})

module.exports = GameSession;

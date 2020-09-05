const { UUID, UUIDV4, INTEGER } = require('sequelize');
const db = require('../db');

const GameSession = db.define('gameSession',{
  id:{
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey:true
  },
  rounds:{
    type: INTEGER
  }
})

module.exports = GameSession;

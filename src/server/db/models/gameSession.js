const { UUID, UUIDV4, INTEGER, BOOLEAN } = require('sequelize');
const db = require('../db');

const GameSession = db.define('gameSession',{
  id:{
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey:true
  },
  rounds:{
    type: INTEGER
  },
  active:{
    type: BOOLEAN,
    defaultValue:true
  }
})

module.exports = GameSession;

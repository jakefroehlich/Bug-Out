const { UUID, UUIDV4 } = require('sequelize');
<<<<<<< HEAD:server/db/models/session.js
const db = require('../db');
=======

const db = require('./db');
>>>>>>> 69a4be768f4eede86bb32219a96179faeaabd4cd:src/server/db/models/gameSession.js

const GameSession = db.define('gameSession',{
  id:{
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey:true
  },
})

module.exports = GameSession;

const {
  INTEGER, STRING, UUID, UUIDV4,
} = require('sequelize');
const db = require('../db');

const Leaderboard = db.define('leaderboard', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  score: {
    type: INTEGER,
    allowNull: false,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
});

module.exports = Leaderboard;

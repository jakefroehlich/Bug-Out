const {
  UUID, UUIDV4, STRING, BOOLEAN, INTEGER,
} = require('sequelize');
const db = require('../db');

const Session = db.define('session', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  name: {
    type: STRING,
    defaultValue: null,
  },
  host: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  score: {
    type: INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  correctAnswer: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = Session;

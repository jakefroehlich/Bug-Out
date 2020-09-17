const {
  UUID, UUIDV4, STRING, BOOLEAN,
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
  },
  host: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = Session;

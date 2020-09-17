const { INTEGER, ENUM, STRING } = require('sequelize');
const db = require('../db');

const Powerup = db.define('powerup', {
  id: {
    type: INTEGER,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  rarity: {
    type: ENUM('Common', 'Uncommon', 'Rare', 'Legendary'),
    allowNull: false,
  },
});

module.exports = Powerup;

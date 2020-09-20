const {
  UUID,
  UUIDV4,
  INTEGER,
  ENUM,
  BOOLEAN,
  STRING,
  JSON,
} = require('sequelize');
const randomWords = require('random-words');
const db = require('../db');
const Prompt = require('./prompt');

const GameSession = db.define('gameSession', {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  },
  rounds: {
    type: INTEGER,
    defaultValue: 1,
  },
  difficulty: {
    type: ENUM('easy', 'medium', 'hard'),
    allowNull: false,
    defaultValue: 'easy',
  },
  active: {
    type: BOOLEAN,
    defaultValue: false,
  },
  private: {
    type: BOOLEAN,
    defaultValue: true,
  },
  code: {
    type: STRING,
    allowNull: true,
  },
  prompt: {
    type: JSON,
    allowNull: true,
  },
  roundEnd: {
    type: STRING,
    allowNull: true,
  },
  roundStart: {
    type: STRING,
    allowNull: true,
  },
});

GameSession.beforeCreate(async (instance) => {
  const gamePrompts = await Prompt.findAll({ where: { difficulty: instance.difficulty } });
  const randomGameIdx = Math.floor(Math.random() * gamePrompts.length);
  const prompt = gamePrompts[randomGameIdx];
  instance.prompt = prompt;
  instance.code = randomWords();
});

module.exports = GameSession;

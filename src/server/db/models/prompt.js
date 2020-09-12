const { UUID, UUIDV4, ENUM, STRING, TEXT } = require('sequelize');
const db = require('../db');

const Prompt = db.define('prompt',{
  id:{
    type: UUID,
    defaultValue: UUIDV4,
    primaryKey:true
  },
  name:{
    type:STRING
  },
  difficulty:{
    type:STRING,
    allowNull: false
  },
  prompt:{
    type: TEXT
  },
  specs:{
    type: STRING
  }

})

module.exports = Prompt;
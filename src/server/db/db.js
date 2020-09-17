const dotenv = require('dotenv');

dotenv.config();
const Sequelize = require('sequelize');

const db = new Sequelize(
  process.env.DATABASE_URL
     || 'posgres://localhost:5432/BugOut',
  {
    logging: false,
  },
);

module.exports = db;

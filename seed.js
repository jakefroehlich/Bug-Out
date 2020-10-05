// import chalk from 'chalk';
const chalk = require('chalk');
// import { sync } from './src/server/db/index';
const { sync } = require('./src/server/db/index');
// import { models } from './src/server/db/models/index';
const { models } = require('./src/server/db/models/index');
const { seedPrompt } = require('./seedPrompts');

const users = [
  {
    email: 'admin',
    name: 'admin',
    password: 'password',
    role: 'admin',
  },
  {
    email: 'member',
    name: 'member',
    password: 'password',
    role: 'member',
  },
];

const powerups = [
  // {
  //   id: 1,
  //   name: 'Flip Screen',
  //   rarity: 'Rare',
  // },
  // {
  //   id: 2,
  //   name: 'Minimize',
  //   rarity: 'Common',
  // },
  // {
  //   id: 3,
  //   name: 'Delete Brackets',
  //   funcName: 'removeBrackets',
  //   rarity: 'Rare',
  // },
  // {
  //   id: 4,
  //   name: 'Delete Parenthesis',
  //   rarity: 'Common',
  //   funcName: 'deleteParens',
  // },
  {
    id: 5,
    name: 'Delete Commas',
    rarity: 'Common',
    funcName: 'deleteCommas',
  },
  {
    id: 7,
    name: 'Flip Declarations',
    rarity: 'Uncommon',
    funcName: 'flipLet',
  },
  {
    id: 8,
    name: 'Flip True',
    rarity: 'Common',
    funcName: 'flipTrue',
  },
  // {
  //   id: 9,
  //   name: 'Add Semicolons',
  //   rarity: 'Common',
  // },
  // {
  //   id: 10,
  //   name: 'Add length',
  //   rarity: 'Common',
  // },
  // {
  //   id: 11,
  //   name: 'Change Truthy',
  //   rarity: 'Uncommon',
  // },
  {
    id: 12,
    name: 'Change Booleans',
    rarity: 'Uncommon',
    funcName: 'changeBoolean',
  },
  // {
  //   id: 13,
  //   name: 'Popups',
  //   rarity: 'Common',
  // },
  {
    id: 14,
    name: '=== -> =',
    rarity: 'Common',
    funcName: 'equalsToAssignment',
  },
  {
    id: 15,
    name: '= -> ===',
    rarity: 'Common',
    funcName: 'assignmentToEquals',
  },
];
const seed = async () => {
  try {
    seedPrompt();
    users.map((user) => models.User.create(user));
    powerups.map((powerup) => models.Powerup.create(powerup));
    console.log(chalk.green('DB SEEDED'));
  } catch (e) {
    console.log(chalk.red('ERROR SEEDING DB'), e);
  }
};

sync(true)
  .then(() => seed())
  .catch(console.log);

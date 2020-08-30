const { db, models} = require('./models/index');
const { User } = models;
const chalk = require('chalk');

const sync=async(force = false) => {
  try{
    await db.sync({force})
    console.log(chalk.blueBright('DB Sync Successfull', `force: ${force}`))
  }
  catch(e){
    console.log(chalk.redBright('DB Sync failed'))
    console.log(e)
  }
}

// const seed =async ()=>{
//   await sync(true);
//   try{
//     await User.create({
//       email: 'joe@me.com',
//       name: 'Joe Spicuzza',
//       department: 'SCPO',
//       role: 'admin',
//       password: '!nvestig8'
//     })
//     console.log(chalk.green('Dev data seeded'))
//   }
//   catch(e){
//     console.log(chalk.red('Dev data seed failed'))
//     console.log(e)
//   }
// }

module.exports={
  db, 
  models,
  sync,
};
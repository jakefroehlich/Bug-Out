/* eslint-disable no-await-in-loop */
const { Router } = require('express');
const { models: { GameSession, Session, Prompt } } = require('../../db/index');
const codeGenerator = require('../utils')

const gameRouter = Router();

// getsCurrentGame 
gameRouter.get('/current', async (req, res) => {
  try {
    // console.log('current game hit')
    const session = await Session.findOne({ where: { id: req.session_id } });
    const game = await GameSession.findOne(
      {
        where:
        {
          id: session.gameSessionId,
          active: true,
        }
      })
    res.status(201).send(game)
  } catch (e) {
    console.log('Error finding current game');
    console.log(e)
  }
})

// Create game session and set the number of rounds. 
gameRouter.post('/createNew', async (req, res) => {
  try {
    let newCode = codeGenerator()
    let check = await GameSession.findOne({ where: { code: newCode } });
    while (check) {
      newCode = codeGenerator();
      check = await GameSession.findOne({ where: { code: newCode } });
    }
    const { rounds, difficulty} = req.body;
    const newGame = await GameSession.create({ rounds, difficulty, newCode })
    res.status(201).send(newGame)
  } catch (e) {
    console.log('Error creating game session');
    console.log(e)
  }
})

// Gets a game prompt based on difficulty
gameRouter.get('/prompt:difficulty', async (req, res) => {
  try {
    const { difficulty } = req.query;
    const gamePrompt = await Prompt.findOne({ where: difficulty })
    res.send(gamePrompt)
  } catch (e) {
    console.log('failed to get game prompt')
    console.log(e)
  }
})

gameRouter.get('/gameSession', async (req, res)=>{
  try{
    const games = await GameSession.findAll({where: {active:true}, include:[Session]})
    res.send(games[0])
  } catch(e){
    console.log('failed to get game')
    console.log(e)
  }
})

module.exports={
  path: '/game',
  router: gameRouter
}
const { Router } = require('express');
const { models:{ GameSession, Prompt } }= require('../../db/index');

const gameRouter = Router();

// Create game session and set the number of rounds. 
gameRouter.post('/gameSession', async (req, res)=>{
  try{
    const { rounds } = req.body;
    const newGame = await GameSession.create({rounds})
    res.status(201).send(newGame)
  } catch(e){
    console.log('Error creating game session');
    console.log(e)
  }
})

// Gets a game prompt based on difficulty
gameRouter.get('/prompt:difficulty', async (req, res)=>{
  try{
    const { difficulty } = req.query;
    const gamePrompt = await Prompt.findOne({where: difficulty})
    res.send(gamePrompt)
  } catch(e){
    console.log('failed to get game prompt')
    console.log(e)
  }
})

module.exports={
  path: '/game',
  router: gameRouter
}
/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */
const { Router } = require('express');
const {
  models: {
    GameSession,
    Session,
    Prompt,
    Powerup,
  },
} = require('../../db/index');
const {codeGenerator} = require('../utils');

const gameRouter = Router();

// getsCurrentGame and players belonging to that game
gameRouter.get('/current/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('id', id)
    const game = await GameSession.findOne({ where: { id }, include: [Session] });
    console.log('game', game)
    res.send(game);
  } catch (e) {
    console.log('Error finding current game');
    console.log(e);
  }
});

gameRouter.put('/newGameCode', async(req, res) => {
  const { code } = req.body;
  console.log(req.body)
  try {
    const gameSession = await GameSession.findOne({ where: { code: code } });
    const newCode = codeGenerator();
    let check = await GameSession.findOne({ where: { code: newCode } });
    while (check) {
      newCode = codeGenerator();
      check = await GameSession.findOne({ where: { code: newCode } });
    }
    await gameSession.update({ code: newCode });
    res.send(newCode);
  }
  catch (e) {
    console.log('Could not update code', e);
  }
})

// Create game session and set the number of rounds.
gameRouter.post('/createGame', async (req, res) => {
  try {
    const { rounds, difficulty } = req.body;
    const createdGame = await GameSession.create({ rounds, difficulty });
    res.send(createdGame);
  } catch (e) {
    console.log('Error updating game session');
    console.log(e);
  }
});
// Add player to a game upon creating the game.
gameRouter.put('/player/:gameSessionId', async (req, res) => {
  try {
    const { gameSessionId } = req.params;
    const session = await Session.findOne({ where: { id: req.cookies.session_id } });
    await session.update({ gameSessionId });
    const gameSession = await GameSession.findOne({ where: { id: gameSessionId }, include: [Session] });
    res.send(gameSession);
  } catch (e) {
    console.log('Error updating game session', e);
  }
});

// Add player to a game with game code.
gameRouter.put('/addplayer/:code', async (req, res) => {
  try {
    const { code } = req.body;
    const gameSession = await GameSession.findOne({ where: { code } });
    const session = await Session.findOne({ where: { id: req.cookies.session_id } });
    const gameSessionId = gameSession.id;
    await session.update({ gameSessionId });
    const updatedGameSession = await GameSession.findOne({ where: { id: gameSessionId }, include: [Session] });
    res.send(updatedGameSession);
  } catch (e) {
    res.status(404).send('failure');
    console.log('Error updating game session with player');
    console.log(e);
  }
});

// Gets a game prompt based on difficulty
gameRouter.get('/prompt/:diff', async (req, res) => {
  try {
    const { diff } = req.params;
    console.log('difficulty', diff)
    const gamePrompts = await Prompt.findAll({ where: { difficulty : diff } });
    const randomGameIdx = Math.floor(Math.random() * gamePrompts.length);
    const prompt = gamePrompts[randomGameIdx];

    console.log('prompt', prompt)

    const session = await Session.findOne({ where: { id: req.session_id } });
    const currentGame = await GameSession.findOne({ where: { id: session.gameSessionId } });
    currentGame.update({ prompt });
    res.send(prompt);
  } catch (e) {
    console.log('failed to get game prompt');
    console.log(e);
  }
});

// This route destroys the game belonging to the session and updates gameSessionId
gameRouter.put('/joinGame', async (req, res) => {
  try {
    const { currentGameId, gameCode } = req.body;
    const session = await Session.findOne({ where: { id: req.session_id } });
    const game = await GameSession.findOne({ where: { code: gameCode } });
    if (!game) {
      res.send('Could not find game');
    } else {
      await session.update({ gameSessionId: game.id });
      const gameToDestroy = await GameSession.findOne({
        where: { id: currentGameId },
      });
      await gameToDestroy.destroy();
      res.send('Ok');
    }
  } catch (e) {
    console.log('failed to join game');
    console.log(e);
  }
});

gameRouter.put('/startGame', async (req, res) => {
  try {
    const { currentGameId } = req.body;
    const game = await GameSession.findOne({ where: { id: currentGameId } });
    game.update({ active: true });
    res.send(game);
  } catch (e) {
    console.log('failed to start game');
    console.log(e);
  }
});

gameRouter.put('/prompt/:id', async (req, res) => {
  try {
    const { prompt } = req.body;
    const { id } = req.params;
    console.log(prompt);
    const game = await GameSession.update({ prompt }, { where: { id } });
    res.send(game);
  } catch (e) {
    console.log(e);
  }
});

gameRouter.get('/powerups', async (req, res) => {
  try {
    const powerupList = await Powerup.findAll();
    res.send(powerupList);
  } catch (e) {
    console.log(e);
  }
});

module.exports = {
  path: '/game',
  router: gameRouter,
};

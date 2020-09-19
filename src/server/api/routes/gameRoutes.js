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

const gameRouter = Router();

// getsCurrentGame and players belonging to that game
gameRouter.get('/current', async (req, res) => {
  try {
    const session = await Session.findOne({ where: { id: req.session_id } });
    const game = await GameSession.findOne({
      where: { id: session.gameSessionId },
    });
    const players = await Session.findAll({
      where: { gameSessionId: game.id },
    });
    res.send({ game, players });
  } catch (e) {
    console.log('Error finding current game');
    console.log(e);
  }
});

// Create game session and set the number of rounds.
gameRouter.post('/updateGame', async (req, res) => {
  try {
    const { rounds, difficulty } = req.body;
    const session = await Session.findOne({ where: { id: req.session_id } });
    const currentGame = await GameSession.findOne({ id: session.gameSessionId });
    // console.log('currentGame found is ', currentGame);
    await currentGame.update({ rounds, difficulty });
    res.send(currentGame);
  } catch (e) {
    console.log('Error updating game session');
    console.log(e);
  }
});

// Gets a game prompt based on difficulty
gameRouter.get('/prompt/:diff', async (req, res) => {
  try {
    const { diff } = req.params;
    const gamePrompts = await Prompt.findAll({ where: { difficulty: diff } });
    const randomGameIdx = Math.floor(Math.random() * gamePrompts.length);
    const prompt = gamePrompts[randomGameIdx];
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

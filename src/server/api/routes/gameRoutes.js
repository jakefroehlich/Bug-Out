/* eslint-disable max-len */
/* eslint-disable no-await-in-loop */
const { Router } = require('express');
const {
  models: {
    GameSession,
    Session,
    Prompt,
    Powerup,
    Leaderboard,
  },
} = require('../../db/index');
// const { codeGenerator } = require('../utils');

const gameRouter = Router();

// getsCurrentGame and players belonging to that game
gameRouter.get('/current/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const session = await Session.findOne({ where: { id: req.session_id } });
    const game = await GameSession.findOne({ where: { id }, include: [Session] });

    const hostStatus = session.dataValues.host;
    const players = game.sessions;
    res.send({ game, players, hostStatus });
  } catch (e) {
    console.log('Error finding current game');
    console.log(e);
  }
});

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
gameRouter.put('/player', async (req, res) => {
  try {
    const { gameSessionId } = req.body;
    const session = await Session.findOne({ where: { id: req.cookies.session_id } });
    await session.update({ gameSessionId });
    const gameSession = await GameSession.findOne({ where: { id: gameSessionId }, include: [Session] });
    res.send(gameSession);
  } catch (e) {
    console.log('Error updating game session', e);
  }
});

// Add player to a game with game code.
gameRouter.put('/addplayer', async (req, res) => {
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

gameRouter.put('/removeplayer', async (req, res) => {
  try {
    const { code } = req.body;
    const gameSession = await GameSession.findOne({ where: { code }, include: [Session] });
    console.log('gamesession', gameSession);
    const filteredPlayers = gameSession.players.filter(p => p.id !== req.cookies.session_id);

    console.log('filtered players', filteredPlayers);

    res.send(filteredPlayers).status(200);
  } catch (e) {
    res.status(404).send('Failed to remove player');
    console.log(e);
  }
})

//  update timing on the game session
gameRouter.put('/game-times/:id', async (req, res) => {
  try {
    const { roundEnd, roundStartUnix, roundEndUnix } = req.body;
    const { id } = req.params;
    const gameSession = await GameSession.findOne({ where: { id } });
    await gameSession.update({ roundEnd, roundStartUnix, roundEndUnix });

    const updatedGameSession = await GameSession.findOne({ where: { id }, include: [Session] });

    res.send(updatedGameSession);
  } catch (e) {
    console.log('Error updating game session with player');
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

// Set a new prompt and subtract the round
gameRouter.put('/prompt/:id', async (req, res) => {
  try {
    const { prompt } = req.body;
    const { id } = req.params;
    const game = await GameSession.findOne({ where: { id } });
    const rounds = game.rounds - 1;
    game.update({ prompt });
    game.update({ rounds });
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

// update the game prompt for the next round
gameRouter.put('/update-prompt/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const game = GameSession.findOne({ where: { id } });

    const gamePrompts = await Prompt.findAll({ where: { difficulty: game.difficulty } });
    const randomGameIdx = Math.floor(Math.random() * gamePrompts.length);
    const prompt = gamePrompts[randomGameIdx];
    game.update({ prompt });
    res.send(prompt);
  } catch (e) {
    console.log(e);
    console.log('error resetting round');
  }
});

// Adds score to the leaderboard
gameRouter.post('/leaderboard', async (req, res) => {
  try {
    const session = await Session.findOne({ where: { id: req.session_id } });
    const { name, score } = session;
    console.log(name, score);
    await Leaderboard.create({ score, name });
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    console.log('error adding score');
  }
});

// get leaderboard.
gameRouter.get('/leaderboard', async (req, res) => {
  try {
    const scores = await Leaderboard.findAll();
    const scoresSorted = scores.sort((a, b) => b.score - a.score);
    res.send(scoresSorted);
  } catch (e) {
    console.log(e);
    console.log('error getting scores');
  }
});

module.exports = {
  path: '/game',
  router: gameRouter,
};

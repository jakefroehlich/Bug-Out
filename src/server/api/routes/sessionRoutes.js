/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-await-in-loop */
const { Router } = require('express');
const {
  models: { Session },
} = require('../../db/index');
const GameSession = require('../../db/models/gameSession');

const sessionRouter = Router();

sessionRouter.get('/current', async (req, res) => {
  try {
    const session = await Session.findOne({ where: { id: req.session_id } });
    res.status(201).send(session);
  } catch (e) {
    console.log('Error getting session');
    console.log(e);
  }
});

// updates name of the session
sessionRouter.put('/updateName', async (req, res) => {
  try {
    const { name } = req.body;
    const session = await Session.findOne({ where: { id: req.session_id } });
    session.update({ name });
    res.status(201).send();
  } catch (e) {
    console.log('Error updating name');
    console.log(e);
  }
});

sessionRouter.post('/makeHost', async (req, res) => {
  try {
    const session = await Session.findOne({ where: { id: req.session_id } });
    session.update({ host: true });
    res.status(201).send(true);
  } catch (e) {
    console.log('Error making host');
    console.log(e);
  }
});

sessionRouter.post('/removeHost', async (req, res) => {
  try {
    const session = await Session.findOne({ where: { id: req.session_id } });
    session.update({ host: false });
    res.status(201).send(false);
  } catch (e) {
    console.log('Error removing host');
    console.log(e);
  }
});

sessionRouter.put('/score', async (req, res) => {
  try {
    const { score } = req.body;
    const session = await Session.findOne({ where: { id: req.session_id } });
    const newScore = session.score + score;
    await session.update({ score: newScore });

    const players = await Session.findAll({ where: { gameSessionId: session.gameSessionId } });
    res.status(201).send({ session, players });
  } catch (e) {
    console.log('Error updating score');
    console.log(e);
  }
});
// sessionRouter.get('/roomPlayers', async (req, res) => {
//   try {
//     const session = await Session.findOne({ where: { gameSessionId: req.session_id }});

//   }
// })

sessionRouter.put('/correct/:id', async (req, res) => {
  try {
    const session = await Session.findOne({ where: { id: req.session_id } });
    const correctAnswer = true;
    await session.update({ correctAnswer });
    const { id } = req.params;
    const game = await GameSession.findOne({ where: { id }, include: [Session] });
    let correct = 0;
    let roundEnd = false;
    game.sessions.forEach((sesh) => {
      if (sesh.correctAnswer) {
        correct++;
      }
    });
    if (correct === game.sessions.length - 1 || correct === game.sessions.length) {
      roundEnd = true;
    }
    res.status(201).send(roundEnd);
  } catch (e) {
    console.log('Error updating correct answer');
    console.log(e);
  }
});

sessionRouter.put('/reset-correct/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const game = await GameSession.findOne({ where: { id }, include: [Session] });
    const correctAnswer = false;
    game.sessions.forEach((session) => {
      session.update({ correctAnswer });
    });
    res.send(game);
  } catch (e) {
    console.log('Error updating players correct values');
  }
});

sessionRouter.put('/leaveGame', async (req, res) => {
  try {
    const session = await Session.findOne({ where: { id: req.session_id } });
    session.update({ score: 0, gameSessionId: null });
    res.status(201).send(session);
  } catch (e) {
    console.log('Error updating score');
    console.log(e);
  }
});

sessionRouter.put('/reset-score', async (req, res) => {
  try {
    const session = await Session.findOne({ where: { id: req.session_id } });
    session.update({ score: 0 });
    res.status(201).send(session);
  } catch (e) {
    console.log('Error updating score');
    console.log(e);
  }
});

module.exports = {
  path: '/session',
  router: sessionRouter,
};
